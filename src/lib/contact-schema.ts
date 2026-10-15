import { z } from 'zod';
export const contactSchema = z.object({
 name: z.string().trim().min(2, 'Informe seu nome (mínimo de 2 caracteres).').max(100),
 email: z.string().trim().email('Informe um e-mail válido.').max(254),
 message: z.string().trim().min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.').max(3000),
 website: z.string().max(0).optional(),
});
