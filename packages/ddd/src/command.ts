import { randomUUID } from 'node:crypto';

export type CommandMetadata = {
  [index: string]: unknown;
  readonly timestamp: number;
};

export type CommandProps<T> = T & Partial<Command>;

export class Command {
  /**
   * Using private instead of # to avoid #private in d.ts
   */
  private readonly _id: string;
  private readonly _timestamp: number;
  private readonly _metadata?: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    this._timestamp = props.metadata?.timestamp ?? Date.now();
    this._metadata = props.metadata;
    this._id = randomUUID();
  }

  getDateOccurred(): Date {
    return new Date(this._timestamp);
  }

  get metadata(): CommandMetadata | undefined {
    const metadata = structuredClone(this._metadata);

    return metadata;
  }

  get id(): string {
    return this._id.toString();
  }
}
