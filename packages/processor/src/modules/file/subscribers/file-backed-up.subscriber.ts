import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RabbitMQClient } from 'src/modules/infrastructure/amqp/rabbitmq.client';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { FileBackedUpEvent } from '../domain/events/file-backed-up.event';

export class FileBackedUpSubscriber {
  constructor(
    @Inject(InfrastructureKeys.RABBITMQ_CLIENT)
    private readonly rabbitMqClient: RabbitMQClient,
  ) {}

  @OnEvent(FileBackedUpEvent.name)
  async handle(event: FileBackedUpEvent) {
    const file = event.file;

    await this.rabbitMqClient.defaultChannel.assertExchange(
      'processor',
      'topic',
      {
        durable: true,
      },
    );

    const props = file.getProps();

    const eventPayload = {
      filename: props.filename,
      url: props.url,
      fileSize: props.fileSize,
      mimetype: props.mimetype,
      uploadId: props.uploadId,
    };

    await this.rabbitMqClient.defaultChannel.publish(
      'processor',
      'file.processed',
      Buffer.from(JSON.stringify(eventPayload)),
      {},
    );
  }
}
