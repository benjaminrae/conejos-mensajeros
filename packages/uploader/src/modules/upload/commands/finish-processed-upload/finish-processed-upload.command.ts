import { Command, CommandProps } from '@conejos-mensajeros/ddd';
import { UpdateProcessedUploadDTO as FinishProcessedUploadDTO } from '../../dto/update-processed-upload.dto';

export class FinishProcessedUploadCommand extends Command {
  upload: FinishProcessedUploadDTO;

  constructor(props: CommandProps<{ upload: FinishProcessedUploadDTO }>) {
    super(props);

    this.upload = props.upload;
  }
}
