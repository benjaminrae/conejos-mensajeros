import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import amqplib from 'amqplib';
import { RabbitMQClient } from 'src/modules/infrastructure/amqp/rabbitmq.client';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { FileEntity } from '../domain/file.entity';

@Injectable()
export class UploadsExchangeSubscriber {
  constructor(
    @Inject(InfrastructureKeys.RABBITMQ_CLIENT)
    private readonly client: RabbitMQClient,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscribe() {
    this.client.defaultChannel.assertQueue('file.uploaded', {
      durable: true,
    });
    this.client.defaultChannel.assertExchange('uploads', 'topic', {
      durable: true,
    });
    this.client.defaultChannel.bindQueue(
      'file.uploaded',
      'uploads',
      'file.uploaded',
    );
    this.client.defaultChannel.consume(
      'file.uploaded',
      (message: amqplib.ConsumeMessage) => {
        if (!message.content) {
          return;
        }

        const data = JSON.parse(message.content.toString());

        const file = FileEntity.create({
          ...data,
          uploadId: data.id,
        });

        file.publishEvents(new Logger(), this.eventEmitter);

        this.client.defaultChannel.ack(message);
      },
    );
  }
}
