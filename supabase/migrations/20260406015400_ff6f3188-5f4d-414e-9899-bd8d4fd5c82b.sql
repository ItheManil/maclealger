
CREATE OR REPLACE FUNCTION public.get_registration_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::integer FROM public.webinar_registrations;
$$;
