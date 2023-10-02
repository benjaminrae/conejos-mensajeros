import { Command, CommandProps } from '@conejos-mensajeros/ddd';
import { Upload } from '../../domain/upload.entity';

export class StartProcessingUploadCommand extends Command {
  upload: Upload;

  constructor(props: CommandProps<{ upload: Upload }>) {
    super(props);

    this.upload = props.upload;
  }
}
