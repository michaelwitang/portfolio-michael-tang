import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { insertContactSubmission } = await import("./contact-store.server");
    await insertContactSubmission(data);
    return { saved: true };
  });
