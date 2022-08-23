import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/Jwt';

export default function verifyToken(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const token = req.headers.authorization;
  if (!token) return null;
  const data = Jwt.verifyToken(token);
  if (typeof data === 'string') return null;
  const { role } = data;
  res.status(200).json({ role });
}
