import { type JwtPayload } from 'jwt-decode';

export interface CustomTokenPayload extends JwtPayload {
  id: string;
  email: string;
}
