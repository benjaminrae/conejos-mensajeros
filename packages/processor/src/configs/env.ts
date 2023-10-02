/* eslint-disable @typescript-eslint/naming-convention */
import * as dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const environment = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  RMQ_PORT: z.number(),
  RMQ_USER: z.string(),
  RMQ_PASSWORD: z.string(),
  RMQ_HOST: z.string(),
  PUBLIC_URL: z.string(),
  PORT: z.number(),
  SUPABASE_KEY: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_BUCKET: z.string(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  RMQ_PORT: Number(process.env.RMQ_PORT),
  RMQ_USER: process.env.RMQ_USER,
  RMQ_PASSWORD: process.env.RMQ_PASSWORD,
  RMQ_HOST: process.env.RMQ_HOST,
  PUBLIC_URL: process.env.PUBLIC_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_BUCKET: process.env.SUPABASE_BUCKET,
  PORT: Number(process.env.PORT),
};

const parsed = environment.safeParse(processEnv);

if (parsed.success === false) {
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== 'string') {
      return undefined;
    }

    return target[prop as keyof typeof target];
  },
});

export { env };
