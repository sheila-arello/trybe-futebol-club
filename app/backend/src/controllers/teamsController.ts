import { Request, Response } from 'express';
import { ITeamsService } from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService: ITeamsService) { }

  async list(req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.list();
    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) res.status(404);
    // await validateParamsId(req.params);
    const teams = await this.teamsService.getById(Number(id));
    res.status(200).json(teams);
  }
}
