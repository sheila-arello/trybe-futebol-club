/* eslint-disable class-methods-use-this */
import { IMatches } from '../interfaces/IMatches';
import Teams from '../database/models/teams';
import NotExists from '../middlewares/NotExists';

export interface ITeamsService {
  list(): Promise<Teams[]>
  getById(id: number): Promise<Teams | null>
  checkIfExists(data: IMatches): Promise<boolean>
}

export default class TeamsService implements ITeamsService {
  // eslint-disable-next-line class-methods-use-this
  public async list(): Promise<Teams[]> {
    const teams: Teams[] = await Teams.findAll();
    return teams;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getById(id: number): Promise<Teams | null> {
    const team = await Teams.findByPk(id);
    return team;
  }

  public async checkIfExists(data: IMatches): Promise<boolean> {
    const team1 = await Teams.findByPk(data.homeTeam);
    const team2 = await Teams.findByPk(data.awayTeam);
    if (!team1 || !team2) throw new NotExists('There is no team with such id!');
    return !!team1;
  }
}
