import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileModule } from './modules/file/file.module';
import { InfrastructureModule } from './modules/infrastructure/infrastructure.module';

@Module({
  imports: [FileModule, InfrastructureModule, EventEmitterModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
