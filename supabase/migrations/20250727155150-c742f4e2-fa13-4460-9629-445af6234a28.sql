-- Fix age classification: 1 year old should be toddler, not infant
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
  
  -- Corrected logic: 1 year old (365+ days) should be toddler
  IF baby_age_days < 0 THEN
    RETURN 'pregnancy';
  ELSIF baby_age_days <= 59 THEN
    RETURN 'newborn';
  ELSIF baby_age_days < 365 THEN  -- Less than 1 year
    RETURN 'infant';
  ELSIF baby_age_days <= 1095 THEN -- 1-3 years
    RETURN 'toddler';
  ELSE
    RETURN 'general';
  END IF;
END;
$function$;