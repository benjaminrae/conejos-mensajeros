import { Command, CommandProps } from '@conejos-mensajeros/ddd';
import { CreateUploadCommandProps } from '../../domain/types';

export class CreateUploadCommand extends Command {
  readonly buffer: Buffer;
  readonly userId: string;
  readonly filename: string;
  readonly mimetype: string;
  readonly fileSize: number;
  readonly url: string;

  constructor(props: CommandProps<CreateUploadCommandProps>) {
    super(props);

    this.buffer = props.buffer;
    this.userId = props.userId;
    this.filename = props.filename;
    this.mimetype = props.mimetype;
    this.fileSize = props.fileSize;
    this.url = props.url;
  }
}
