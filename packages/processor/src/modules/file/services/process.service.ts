import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileEntity } from '../domain/file.entity';
import { FileStrategy } from '../strategies/file.strategy';

@Injectable()
export class ProcessService {
  #strategy: FileStrategy;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  setStrategy(strategy: FileStrategy): void {
    this.#strategy = strategy;
  }

  async process(file: FileEntity): Promise<void> {
    const processedFile = await this.#strategy.execute(file);

    file.process(processedFile.getProps());

    file.publishEvents(new Logger(), this.eventEmitter);
  }
}
