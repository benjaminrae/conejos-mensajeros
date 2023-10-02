import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { HttpAuthGuard } from 'src/modules/auth/guards/http-auth.guard';
import { AuthenticatedRequest } from 'src/modules/auth/types';
import { UploadResponseDTO } from '../../dto/upload.reponse.dto';
import { GetUploadsQuery } from './get-uploads.query';

@Controller('v1')
export class GetUploadsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('uploads')
  @UseGuards(HttpAuthGuard)
  async getUploads(
    @Req() request: AuthenticatedRequest,
  ): Promise<UploadResponseDTO[]> {
    const userId = request.user.id;

    const query = new GetUploadsQuery(userId);

    const result = await this.queryBus.execute(query);

    if (result.isFailure()) {
      throw result.value;
    }

    return result.value;
  }
}
