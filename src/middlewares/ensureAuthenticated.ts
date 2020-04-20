import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token ausente.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // forço a variavel decoded a ser do tipo tokenpayload
    const { sub } = decoded as TokenPayload;

    // incluo a informaçao do usuario dentro do request, via substituicao de tipos(arquivo express.d.ts)
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Token JWT inválido');
  }
}
