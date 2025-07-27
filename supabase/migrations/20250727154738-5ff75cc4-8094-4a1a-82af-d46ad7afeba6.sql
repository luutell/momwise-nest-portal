-- Fix the get_maternity_phase function - there's a logic error
CREATE OR REPLACE FUNCTION public.get_maternity_phase(baby_birth_date date)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  baby_age_days INTEGER;
BEGIN
  IF baby_birth_date IS NULL THEN
    RETURN 'general';
  END IF;
  
  baby_age_days := CURRENT_DATE - baby_birth_date;
  
  -- Debug: let's see what we're calculating
  RAISE NOTICE 'Baby birth date: %, Current date: %, Age in days: %', baby_birth_date, CURRENT_DATE, baby_age_days;
  
  IF baby_age_days < 0 THEN
    RETURN 'pregnancy';
  ELSIF baby_age_days <= 28 THEN
    RETURN 'newborn';
  ELSIF baby_age_days <= 365 THEN
    RETURN 'infant';
  ELSIF baby_age_days <= 1095 THEN -- 3 years
    RETURN 'toddler';
  ELSE
    RETURN 'general';
  END IF;
END;
$function$