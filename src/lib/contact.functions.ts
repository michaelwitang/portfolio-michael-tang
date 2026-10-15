import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './contact-schema';
export const submitContact = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => contactSchema.parse(input))
 .handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('contact_submissions').insert({ name: data.name, email: data.email, message: data.message });
  if (error) throw new Error('Não foi possível salvar sua mensagem. Tente novamente ou entre em contato por e-mail.');
  return { saved: true };
 });
