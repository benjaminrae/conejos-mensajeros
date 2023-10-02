import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { basename, extname } from 'path';
import { env } from 'src/configs/env';
import { HttpAuthGuard } from 'src/modules/auth/guards/http-auth.guard';
import { AuthenticatedRequest } from 'src/modules/auth/types';
import { CreateUploadCommand } from './create-upload.command';

@Controller('v1')
export class CreateUploadHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(HttpAuthGuard)
  async createUpload(
    @Req() request: AuthenticatedRequest,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ) {
    const ownerId = request.user.id;

    const uploadUrl = new URL(`${uploadedFile.path}`, `${env.PUBLIC_URL}`);
    console.log(uploadUrl.toString());

    const fileExtension = extname(uploadedFile.originalname);
    const fileBaseName = basename(uploadedFile.originalname, fileExtension);
    const newFileName = `${fileBaseName}-${Date.now()}${fileExtension}`;

    const createUploadCommand = new CreateUploadCommand({
      filename: newFileName,
      fileSize: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
      userId: ownerId,
      buffer: uploadedFile.buffer,
      url: uploadUrl.toString(),
    });

    const result = await this.commandBus.execute(createUploadCommand);

    if (result.isFailure()) {
      throw result.value;
    }

    return {
      id: result.value,
    };
  }
}
