DROP POLICY IF EXISTS "auth insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "auth update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "auth delete site_settings" ON public.site_settings;

CREATE POLICY "signed in users can create site_settings"
ON public.site_settings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "signed in users can update site_settings"
ON public.site_settings
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "signed in users can delete site_settings"
ON public.site_settings
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);