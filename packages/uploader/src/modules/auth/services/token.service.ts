export interface TokenService {
  validateToken(token: string): boolean;
  generateToken<Payload extends object>(payload: Payload): string;
  refreshToken(token: string): string;
  decodeToken<Payload>(token: string): Payload | null;
}
