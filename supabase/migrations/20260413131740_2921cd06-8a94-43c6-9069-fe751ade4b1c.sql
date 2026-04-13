DROP TRIGGER IF EXISTS enforce_registration_limit ON public.webinar_registrations;
DROP FUNCTION IF EXISTS public.check_registration_limit();
DROP FUNCTION IF EXISTS public.get_registration_count();