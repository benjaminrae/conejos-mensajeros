import { Logger, Module } from '@nestjs/common';
import { amqpConfig } from 'src/configs/amqp.config';
import { storageConfig } from 'src/configs/storage.config';
import { SupabaseClient } from 'src/modules/infrastructure/storage/supabase.client';
import { RabbitMQClient } from './amqp/rabbitmq.client';
import { HttpClient } from './http/http.client';
import { InfrastructureKeys } from './infrastructure.keys';

@Module({
  imports: [],
  providers: [
    {
      provide: InfrastructureKeys.RABBITMQ_CLIENT,
      useFactory: async () => {
        const client = new RabbitMQClient(
          amqpConfig,
          new Logger(RabbitMQClient.name),
        );

        await client.connect();

        return client;
      },
    },
    {
      provide: InfrastructureKeys.SUPABASE_CLIENT,
      useFactory: async () => {
        const client = new SupabaseClient(
          storageConfig,
          new Logger(SupabaseClient.name),
        );

        await client.connect();

        return client;
      },
    },
    {
      provide: InfrastructureKeys.HTTP_CLIENT,
      useClass: HttpClient,
    },
  ],
  exports: [
    InfrastructureKeys.RABBITMQ_CLIENT,
    InfrastructureKeys.SUPABASE_CLIENT,
    InfrastructureKeys.HTTP_CLIENT,
  ],
})
export class InfrastructureModule {}
