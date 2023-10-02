import { Global, Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { amqpConfig } from 'src/configs/amqp.config';
import { RabbitMQClient } from './amqp/rabbitmq.client';
import { InfrastructureKeys } from './infrastructure.keys';
import { datasourceOptions } from './persistence/typeorm.datasource';

@Global()
@Module({
  imports: [CqrsModule, TypeOrmModule.forRoot(datasourceOptions)],
  controllers: [],
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
  ],
  exports: [InfrastructureKeys.RABBITMQ_CLIENT],
})
export class InfrastructureModule {}
