import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthKeys } from '../auth.keys';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(
    @Inject(AuthKeys.JWT_TOKEN_SERVICE)
    private readonly jwtTokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtTokenService.decodeToken(token);

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractToken(request: Request): string {
    const authHeader = new Headers(request.headers).get('Authorization') ?? '';
    const token = authHeader.split(' ')[1];

    return token;
  }
}
