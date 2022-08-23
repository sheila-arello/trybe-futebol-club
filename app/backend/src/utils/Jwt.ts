import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'MySecretWord';

export default class Jwt {
  static generateToken(payload: { id: number, email: string, role:string }): string {
    return sign(payload, secret);
  }

  static verifyToken(token: string) {
    const data = verify(token, secret);
    return data;
  }
}
