import { Request, Response } from 'express';
import { IUserService } from '../services/UserService';

export default class UserController {
  constructor(private userService: IUserService) { }

  async list(req: Request, res: Response): Promise<void> {
    const users = await this.userService.list();
    res.status(200).json(users);
  }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this.userService.login(req.body);
    res.status(200).json({ token });
  }

  // async login(req: Request, res: Response): Promise<void> {
  //   const token = await this.userService.login(req.body);
  //   res.status(200).json({ token });
  // }
}
