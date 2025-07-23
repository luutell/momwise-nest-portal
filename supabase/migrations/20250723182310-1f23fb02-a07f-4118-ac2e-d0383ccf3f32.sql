-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'premium')),
  subscription_end TIMESTAMPTZ,
  free_months_remaining INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create referrals table to track referral system
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subscribed BOOLEAN DEFAULT false,
  rewarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create referral_rewards table to track earned free months
CREATE TABLE public.referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reward_type TEXT DEFAULT 'free_month',
  months_earned INTEGER DEFAULT 1,
  referral_count INTEGER NOT NULL,
  applied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_rewards ENABLE ROW LEVEL SECURITY;

-- Policies for subscribers
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Policies for referrals
CREATE POLICY "select_own_referrals" ON public.referrals
FOR SELECT
USING (referrer_id = auth.uid());

CREATE POLICY "insert_referrals" ON public.referrals
FOR INSERT
WITH CHECK (referrer_id = auth.uid());

CREATE POLICY "update_referrals" ON public.referrals
FOR UPDATE
USING (true);

-- Policies for referral_rewards
CREATE POLICY "select_own_rewards" ON public.referral_rewards
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "insert_rewards" ON public.referral_rewards
FOR INSERT
WITH CHECK (true);

CREATE POLICY "update_rewards" ON public.referral_rewards
FOR UPDATE
USING (true);

-- Function to check referral milestones and create rewards
CREATE OR REPLACE FUNCTION public.check_referral_milestone()
RETURNS TRIGGER AS $$
DECLARE
  referral_count INTEGER;
  milestone_reached INTEGER;
  unrewarded_referrals UUID[];
BEGIN
  -- Count successful referrals for this user
  SELECT COUNT(*) INTO referral_count
  FROM public.referrals
  WHERE referrer_id = NEW.referrer_id 
    AND subscribed = true 
    AND rewarded = false;
  
  -- Check if milestone reached (every 3 referrals)
  IF referral_count >= 3 THEN
    milestone_reached := referral_count / 3;
    
    -- Get IDs of unrewarded referrals to mark as rewarded
    SELECT ARRAY(
      SELECT id FROM public.referrals
      WHERE referrer_id = NEW.referrer_id 
        AND subscribed = true 
        AND rewarded = false
      ORDER BY created_at
      LIMIT 3
    ) INTO unrewarded_referrals;
    
    -- Create reward record
    INSERT INTO public.referral_rewards (
      user_id,
      reward_type,
      months_earned,
      referral_count,
      applied
    ) VALUES (
      NEW.referrer_id,
      'free_month',
      milestone_reached,
      referral_count,
      false
    );
    
    -- Mark specific referrals as rewarded
    UPDATE public.referrals
    SET rewarded = true, updated_at = now()
    WHERE id = ANY(unrewarded_referrals);
    
    -- Add free months to subscriber
    UPDATE public.subscribers
    SET free_months_remaining = free_months_remaining + milestone_reached,
        updated_at = now()
    WHERE user_id = NEW.referrer_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check referral milestones when a referral subscribes
CREATE TRIGGER referral_milestone_trigger
  AFTER UPDATE ON public.referrals
  FOR EACH ROW
  WHEN (NEW.subscribed = true AND OLD.subscribed = false)
  EXECUTE FUNCTION public.check_referral_milestone();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();