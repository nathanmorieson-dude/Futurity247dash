import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  SUPABASE_JWT_SECRET: z.string().min(20).optional(),
  RETELL_API_KEY: z.string().min(20),
  RETELL_WEBHOOK_SECRET: z.string().min(10),
  TWILIO_ACCOUNT_SID: z.string().min(10),
  TWILIO_AUTH_TOKEN: z.string().min(10),
  TWILIO_SMS_FROM: z.string().min(4),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().email(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().min(40),
  STRIPE_SECRET_KEY: z.string().min(10),
  STRIPE_WEBHOOK_SECRET: z.string().min(10),
  STRIPE_PRICE_STARTER: z.string().min(3),
  STRIPE_PRICE_PRO: z.string().min(3),
  STRIPE_PRICE_PREMIUM: z.string().min(3),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  ADMIN_EMAIL_ALLOWLIST: z.string().optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

let cachedServerEnv: z.infer<typeof serverEnvSchema> | null = null;
let cachedPublicEnv: z.infer<typeof publicEnvSchema> | null = null;

export function getServerEnv() {
  if (!cachedServerEnv) {
    cachedServerEnv = serverEnvSchema.parse(process.env);
  }

  return cachedServerEnv;
}

export function getPublicEnv() {
  if (!cachedPublicEnv) {
    cachedPublicEnv = publicEnvSchema.parse(process.env);
  }

  return cachedPublicEnv;
}
