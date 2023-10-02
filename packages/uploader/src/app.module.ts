import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InfrastructureModule } from './modules/infrastructure/infrastructure.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    InfrastructureModule,
    UserModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
