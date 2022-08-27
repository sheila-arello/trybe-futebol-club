import { Request, Response } from 'express';
import { ILeaderboardService } from '../services/LeaderboardService';
// import { ITeamsService } from '../services/TeamsService';

export default class LeaderboardController {
  constructor(
    private leaderbordService: ILeaderboardService,
    // private teamsService: ITeamsService,
  ) { }

  async totalPoints(req: Request, res: Response): Promise<void> {
    const total = await this.leaderbordService.totalPoints();
    res.status(200).json(total);
  }
}
