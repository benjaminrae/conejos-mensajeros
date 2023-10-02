import { env } from './env';

export type StorageConfig = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseBucket: string;
};

export const storageConfig: StorageConfig = {
  supabaseUrl: env.SUPABASE_URL,
  supabaseKey: env.SUPABASE_KEY,
  supabaseBucket: env.SUPABASE_BUCKET,
};
