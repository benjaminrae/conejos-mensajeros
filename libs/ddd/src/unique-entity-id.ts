import { randomUUID } from 'node:crypto';
import { Identifier } from './identifier';

export class UniqueEntityId extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : randomUUID());
  }
}
