import { Module, Provider } from '@nestjs/common';
import { AuthKeys } from './auth.keys';
import { HttpAuthGuard } from './guards/http-auth.guard';
import { JwtTokenService } from './services/jwt-token.service';

const services: Provider[] = [
  {
    provide: AuthKeys.JWT_TOKEN_SERVICE,
    useClass: JwtTokenService,
  },
  HttpAuthGuard,
];

@Module({
  providers: [...services],
  exports: [...services],
})
export class AuthModule {}
