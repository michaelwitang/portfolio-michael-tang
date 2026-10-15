import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_ebc14hs';
const TEMPLATE_ID = 'template_ffmnwmu';
const PUBLIC_KEY = '1kbbXLaZQcJT5_1k5';

export async function sendContactEmail(fields: { name: string; email: string; message: string }) {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: fields.name, from_email: fields.email, message: fields.message },
    { publicKey: PUBLIC_KEY },
  );
}
