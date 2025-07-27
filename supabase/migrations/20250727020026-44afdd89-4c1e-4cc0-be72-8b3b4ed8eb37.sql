DROP FUNCTION IF EXISTS public.get_maternity_phase(date);

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
  
  IF baby_age_days < 0 THEN
    RETURN 'pregnancy';
  ELSIF baby_age_days <= 28 THEN
    RETURN 'newborn';
  ELSIF baby_age_days <= 365 THEN
    RETURN 'infant';
  ELSIF baby_age_days <= 1095 THEN -- 3 anos
    RETURN 'toddler';
  ELSE
    RETURN 'general';
  END IF;
END;
$function$;