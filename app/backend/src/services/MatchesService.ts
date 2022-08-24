import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface IMatchesService {
  list(): Promise<Matches[]>
  getById(id: number): Promise<Matches | null>
}

export default class UserService implements IMatchesService {
  // eslint-disable-next-line class-methods-use-this
  public async list(): Promise<Matches[]> {
    const matches: Matches[] = await Matches
      .findAll({
        include: [
          {
            model: Teams,
            foreignKey: 'homeTeam',
            as: 'teamHome',
            attributes: ['teamName'],
          },
          {
            model: Teams,
            foreignKey: 'awayTeam',
            as: 'teamAway',
            attributes: ['teamName'],
          },
        ],
      });
    return matches;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getById(id: number): Promise<Matches | null> {
    const match = await Matches.findByPk(id);
    return match;
  }
}
