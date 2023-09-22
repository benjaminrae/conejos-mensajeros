import { randomUUID } from 'node:crypto';

export type CommandMetadata = {
  [index: string]: unknown;
  readonly timestamp: number;
};

export type CommandProps<T> = T & {
  metadata?: CommandMetadata;
};

export class Command {
  #id: string;
  #timestamp: number;
  #metadata?: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    this.#timestamp = props.metadata?.timestamp ?? Date.now();
    this.#metadata = props.metadata;
    this.#id = randomUUID();
  }

  getDateOccurred(): Date {
    return new Date(this.#timestamp);
  }

  get metadata(): CommandMetadata | undefined {
    const metadata = structuredClone(this.#metadata);

    return metadata;
  }

  get id(): string {
    return this.#id.toString();
  }
}
