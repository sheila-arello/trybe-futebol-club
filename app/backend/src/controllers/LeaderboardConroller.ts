import { Request, Response } from 'express';
import { ILeaderboardService } from '../services/LeaderboardService';
// import { ITeamsService } from '../services/TeamsService';

export default class LeaderboardController {
  constructor(
    private leaderbordService: ILeaderboardService,
    // private teamsService: ITeamsService,
  ) { }

  async finalTableHT(_req: Request, res: Response): Promise<void> {
    const total = await this.leaderbordService.finalTableHT();
    res.status(200).json(total);
  }

  async finalTableAT(_req: Request, res: Response): Promise<void> {
    const total = await this.leaderbordService.finalTableAT();
    res.status(200).json(total);
  }

  async totalPointsLeaderboard(_req: Request, res: Response): Promise<void> {
    const total = await this.leaderbordService.totalPointsLeaderboard();
    res.status(200).json(total);
  }
}
