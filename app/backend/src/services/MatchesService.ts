import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface IMatchesService {
  list(inProgress?: boolean): Promise<Matches[]>
  getById(id: number): Promise<Matches | null>
}

export default class UserService implements IMatchesService {
  // eslint-disable-next-line class-methods-use-this

  private include = [
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
    }];

  public async list(inProgress?: boolean): Promise<Matches[]> {
    let matches: Matches[] = [];
    if (inProgress === undefined) {
      matches = await Matches
        .findAll({ include: this.include });
    } else {
      matches = await Matches
        .findAll({
          where: { inProgress },
          include: this.include,
        });
    }
    return matches;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getById(id: number): Promise<Matches | null> {
    const match = await Matches.findByPk(id);
    return match;
  }
}
