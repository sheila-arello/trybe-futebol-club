import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/Jwt';
import NotFoundError from './NotFoundError';

export interface IRole extends Response {
  role: string
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  if (!token) throw new NotFoundError('Token must be a valid token');
  // type teste = { role: string };
  const data = Jwt.verifyToken(token) as { role: string };
  const { role } = data;
  const dataRole: IRole = res as IRole;
  dataRole.role = role;
  next();
}
