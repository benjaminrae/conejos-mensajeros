import { Logger } from '@conejos-mensajeros/ddd';
import StorageFileApi from '@supabase/storage-js/dist/module/packages/StorageFileApi';
import {
  createClient,
  SupabaseClient as SupabaseSDKCLient,
} from '@supabase/supabase-js';
import { StorageConfig } from 'src/configs/storage.config';

export class SupabaseClient {
  #client: SupabaseSDKCLient;
  #connected: boolean = false;
  #defaultBucket: StorageFileApi;

  constructor(
    private readonly config: StorageConfig,
    private readonly logger: Logger,
  ) {}

  async connect(): Promise<void> {
    this.logger.debug('Connecting to Supabase');
    try {
      this.#client = await createClient(
        this.config.supabaseUrl,
        this.config.supabaseKey,
      );
      this.#defaultBucket = await this.#client.storage.from(
        this.config.supabaseBucket,
      );
      this.#connected = true;
      this.logger.debug('Connected to Supabase');
    } catch (error) {
      this.logger.error('Error connecting to Supabase', error);
      throw error;
    }
  }

  get client(): SupabaseSDKCLient {
    if (!this.#connected) {
      throw new Error('Not connected to Supabase');
    }

    return this.#client;
  }

  get defaultBucket(): StorageFileApi {
    if (!this.#connected) {
      throw new Error('Not connected to Supabase');
    }

    return this.#defaultBucket;
  }
}
