import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { RabbitMQClient } from 'src/modules/infrastructure/amqp/rabbitmq.client';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { StartProcessingUploadCommand } from '../commands/start-processing-command/start-processing-upload.command';
import { FileUploadedEvent } from '../domain/events/file-uploaded.event';

@Injectable()
export class FileUploadedSubscriber {
  constructor(
    @Inject(InfrastructureKeys.RABBITMQ_CLIENT)
    private readonly rabbitMqClient: RabbitMQClient,
    private readonly commandBus: CommandBus,
  ) {}

  @OnEvent(FileUploadedEvent.name)
  async handle(event: FileUploadedEvent) {
    const upload = event.upload;

    await this.publishToRabbitMQ(event);

    await this.commandBus.execute(
      new StartProcessingUploadCommand({
        upload,
      }),
    );
  }

  async publishToRabbitMQ(event: FileUploadedEvent) {
    const channel = await this.rabbitMqClient.defaultChannel;

    await channel.assertExchange('uploads', 'topic');

    await channel.publish(
      'uploads',
      'file.uploaded',
      Buffer.from(JSON.stringify(event.upload.toObject())),
    );
  }
}
