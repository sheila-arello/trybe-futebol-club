import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

export default class Jwt {
  private static secret: string;

  constructor() {
    Jwt.secret = process.env.SECRET || 'MySecretWord';
  }

  static generateToken(payload: { id:number, email: string }): string {
    // return sign(payload, Jwt.secret);
    return sign(payload, 'MySecretWord');
  }

  static verifyToken(token: string): string {
    // return verify(token, Jwt.secret) as string;
    return verify(token, 'MySecretWord') as string;
  }
}
