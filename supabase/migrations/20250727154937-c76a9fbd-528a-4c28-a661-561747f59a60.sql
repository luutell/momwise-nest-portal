-- Fix the get_maternity_phase function - incorrect logic for newborn period
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
  
  -- Fixed logic: newborn is 0-59 days old, infant is 60 days to 1 year
  IF baby_age_days < 0 THEN
    RETURN 'pregnancy';
  ELSIF baby_age_days <= 59 THEN
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