import { sign, verify } from 'jsonwebtoken';
import { env } from 'src/configs/env';
import { JwtTokenPayload } from '../types';
import { TokenService } from './token.service';

export class JwtTokenService implements TokenService {
  private readonly secret = env.JWT_SECRET;

  constructor() {}

  decodeToken<JwtTokenPayload>(token: string): JwtTokenPayload | null {
    return verify(token, this.secret) as JwtTokenPayload;
  }

  validateToken(token: string): boolean {
    const isValid = verify(token, this.secret) !== null;

    return isValid;
  }

  generateToken<JwtTokenPayload>(payload: JwtTokenPayload): string {
    return sign(payload as object, this.secret, { expiresIn: '24h' });
  }

  refreshToken(token: string): string {
    const payload = this.decodeToken<JwtTokenPayload>(token);

    if (!payload) {
      throw new Error('Invalid token');
    }

    const newToken = this.generateToken<JwtTokenPayload>(payload);

    return newToken;
  }
}
