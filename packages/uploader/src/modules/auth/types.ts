import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type AuthenticatedRequest = Request & {
  user: JwtTokenPayload;
};

export type JwtTokenPayload = JwtPayload & {
  id: string;
  email: string;
};
