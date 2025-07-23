-- Fix security warnings by setting search_path for functions
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;