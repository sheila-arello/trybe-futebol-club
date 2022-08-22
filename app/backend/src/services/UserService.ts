import { UserCredentials } from '../interfaces/IUser';
import User from '../database/models/user';
import Jwt from '../utils/Jwt';
// import { UserCredentials } from '../interfaces/IUser';

export interface IUserService {
  list(): Promise<User[]>
  login(userCredentials: UserCredentials): Promise<string | null>
}

export default class UserService implements IUserService {
  // eslint-disable-next-line class-methods-use-this
  public async list(): Promise<User[]> {
    const users: User[] = await User.findAll();
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  public async login(userCredentials: UserCredentials): Promise<string | null> {
    const user: User | null = await User.findOne({ where: { email: userCredentials.email } });
    console.log(user?.id);
    // verificar a senha tambem

    // Gerar o token
    if (!user) return null;
    const token = Jwt.generateToken({
      email: user.email,
      id: user.id,
    });

    return token;
  }
}
