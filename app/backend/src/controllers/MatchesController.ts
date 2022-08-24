import { Request, Response } from 'express';
import { IMatchesService } from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: IMatchesService) { }

  async list(req: Request, res: Response): Promise<void> {
    // matches?inProgress=false
    const { inProgress } = req.query;
    let matches = [];
    if (inProgress !== undefined) { // this.getQuery();
      const bool = (inProgress === 'true');
      matches = await this.matchesService.list(bool);
    } else {
      matches = await this.matchesService.list();
    }
    res.status(200).json(matches);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) res.status(404);
    // await validateParamsId(req.params);
    const matches = await this.matchesService.getById(Number(id));
    res.status(200).json(matches);
  }
}
