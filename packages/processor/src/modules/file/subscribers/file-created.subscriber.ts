import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { HttpClient } from 'src/modules/infrastructure/http/http.client';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { FileCreatedEvent } from '../domain/events/file-created.event';

@Injectable()
export class FileCreatedSubscriber {
  constructor(
    @Inject(InfrastructureKeys.HTTP_CLIENT)
    private readonly httpClient: HttpClient,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(FileCreatedEvent.name)
  async handle(event: FileCreatedEvent) {
    const file = event.file;

    const { data } = await this.httpClient.getFile(event.file.getProps().url);

    file.download(data);

    file.publishEvents(new Logger(), this.eventEmitter);
  }
}
