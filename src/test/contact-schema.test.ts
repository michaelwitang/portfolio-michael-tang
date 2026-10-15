import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';
describe('Contact validation', () => {
 const valid = { name: 'Michael Tang', email: 'test@example.com', message: 'Uma mensagem válida para contato.' };
 it('accepts and trims valid messages', () => { expect(contactSchema.parse({ ...valid, name: ' Michael Tang ' }).name).toBe('Michael Tang'); });
 it('rejects invalid email and short messages', () => { expect(contactSchema.safeParse({ ...valid, email: 'invalid' }).success).toBe(false); expect(contactSchema.safeParse({ ...valid, message: 'oi' }).success).toBe(false); });
 it('rejects overlong messages and populated honeypots', () => { expect(contactSchema.safeParse({ ...valid, message: 'a'.repeat(3001) }).success).toBe(false); expect(contactSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false); });
});