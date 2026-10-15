import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type ContactFields = { name: string; email: string; message: string };

function isOpaqueKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createFetch(apiKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isOpaqueKey(apiKey) && headers.get("Authorization") === `Bearer ${apiKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", apiKey);
    return fetch(input, { ...init, headers });
  };
}

function createClientInstance() {
  const url = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const apiKey =
    process.env.SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !apiKey) {
    throw new Error("Database configuration missing: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.");
  }

  return createClient<Database>(url, apiKey, {
    global: { fetch: createFetch(apiKey) },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let instance: ReturnType<typeof createClientInstance> | undefined;

function getClient() {
  if (!instance) instance = createClientInstance();
  return instance;
}

export async function insertContactSubmission(fields: ContactFields): Promise<void> {
  const { error } = await getClient()
    .from("contact_submissions")
    .insert({
      name: fields.name,
      email: fields.email,
      message: fields.message,
    });

  if (error) {
    throw new Error(
      "Não foi possível salvar sua mensagem. Tente novamente ou entre em contato por e-mail.",
    );
  }
}
