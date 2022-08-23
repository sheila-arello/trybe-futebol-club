import NotFoundError from '../middlewares/NotFoundError';
import { UserCredentials } from '../interfaces/IUser';
import User from '../database/models/user';
import Jwt from '../utils/Jwt';
import encryptedPassword from '../utils/encrypt';

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

    // Gerar o token
    // if (!user) {
    //   const e = new Error();
    //   e.name = 'NotFoundError';
    //   e.message = 'Incorrect email or password';
    //   throw e;
    // }
    if (!user) throw new NotFoundError('Incorrect email or password');
    // verificar a senha tambem
    const isPasswordValid = encryptedPassword.compare(userCredentials.password, user?.password);
    if (!isPasswordValid) throw new NotFoundError('Incorrect email or password');
    const token = Jwt.generateToken({
      email: user.email,
      id: user.id,
    });

    return token;
  }
}