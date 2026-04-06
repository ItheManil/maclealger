
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  pays TEXT,
  projet TEXT,
  interet TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration form, no auth required)
CREATE POLICY "Anyone can register for the webinar"
  ON public.webinar_registrations
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read registrations (admin access only)
CREATE POLICY "Service role can read registrations"
  ON public.webinar_registrations
  FOR SELECT
  USING (false);
