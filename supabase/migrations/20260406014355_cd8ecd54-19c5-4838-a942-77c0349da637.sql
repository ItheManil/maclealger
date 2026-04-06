
CREATE OR REPLACE FUNCTION public.check_registration_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.webinar_registrations) >= 50 THEN
    RAISE EXCEPTION 'registration_full' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_registration_limit
BEFORE INSERT ON public.webinar_registrations
FOR EACH ROW
EXECUTE FUNCTION public.check_registration_limit();
