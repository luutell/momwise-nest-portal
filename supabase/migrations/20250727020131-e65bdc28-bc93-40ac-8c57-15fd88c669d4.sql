DROP FUNCTION IF EXISTS public.get_personalized_calendar_content(date, date);

CREATE OR REPLACE FUNCTION public.get_personalized_calendar_content(user_baby_birth_date date, target_date date)
 RETURNS TABLE(id uuid, title text, description text, content_type text, content_url text, content_data jsonb, thumbnail_url text, duration_minutes integer, category text, is_premium boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  baby_age_days INTEGER;
  user_maternity_phase TEXT;
  day_of_week INTEGER;
  week_offset INTEGER;
BEGIN
  -- Calcular idade do bebê e fase
  IF user_baby_birth_date IS NULL THEN
    baby_age_days := 0;
    user_maternity_phase := 'general';
    week_offset := 0;
  ELSE
    baby_age_days := target_date - user_baby_birth_date;
    user_maternity_phase := public.get_maternity_phase(user_baby_birth_date);
    week_offset := (target_date - user_baby_birth_date) / 7;
  END IF;
  
  day_of_week := EXTRACT(DOW FROM target_date); -- 0 = domingo
  
  RETURN QUERY
  SELECT 
    cc.id,
    cc.title,
    cc.description,
    cc.content_type,
    cc.content_url,
    cc.content_data,
    cc.thumbnail_url,
    cc.duration_minutes,
    cc.category,
    cc.is_premium
  FROM public.calendar_contents cc
  WHERE 
    cc.maternity_phase = user_maternity_phase
    AND (cc.baby_age_min_days IS NULL OR baby_age_days >= cc.baby_age_min_days)
    AND (cc.baby_age_max_days IS NULL OR baby_age_days <= cc.baby_age_max_days)
    AND (cc.day_of_week IS NULL OR cc.day_of_week = day_of_week)
  ORDER BY 
    CASE WHEN cc.week_offset = week_offset THEN 1 ELSE 2 END,
    cc.created_at DESC
  LIMIT 1;
END;
$function$;