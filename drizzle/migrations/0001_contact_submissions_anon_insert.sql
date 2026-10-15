GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY contact_submissions_anon_insert ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);