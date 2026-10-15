DROP POLICY IF EXISTS contact_submissions_anon_insert ON public.contact_submissions;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'contact_submissions' AND policyname = 'contact_submissions_insert'
  ) THEN
    CREATE POLICY contact_submissions_insert ON public.contact_submissions
      FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
