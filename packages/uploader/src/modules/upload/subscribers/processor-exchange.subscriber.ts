import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import amqplib from 'amqplib';
import { RabbitMQClient } from 'src/modules/infrastructure/amqp/rabbitmq.client';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { FinishProcessedUploadCommand } from '../commands/finish-processed-upload/finish-processed-upload.command';
import { UpdateProcessedUploadDTO } from '../dto/update-processed-upload.dto';

export class ProcessorExchangeSubscriber {
  constructor(
    @Inject(InfrastructureKeys.RABBITMQ_CLIENT)
    private readonly rabbitMqClient: RabbitMQClient,
    private commandBus: CommandBus,
  ) {}

  async subscribe() {
    this.rabbitMqClient.defaultChannel.assertQueue('file.processed', {
      durable: true,
    });
    this.rabbitMqClient.defaultChannel.assertExchange('processor', 'topic', {
      durable: true,
    });

    this.rabbitMqClient.defaultChannel.bindQueue(
      'file.processed',
      'processor',
      'file.processed',
    );
    this.rabbitMqClient.defaultChannel.consume(
      'file.processed',
      (message: amqplib.ConsumeMessage) => {
        if (!message.content) {
          return;
        }

        const data = JSON.parse(message.content.toString());

        const updateDTO = new UpdateProcessedUploadDTO({
          uploadId: data.uploadId,
          mimetype: data.mimetype,
          filename: data.filename,
          fileSize: data.fileSize,
          url: data.url,
        });
        console.log(data);
        const command = new FinishProcessedUploadCommand({ upload: updateDTO });
        this.commandBus.execute(command);

        this.rabbitMqClient.defaultChannel.ack(message);
      },
    );
  }
}
