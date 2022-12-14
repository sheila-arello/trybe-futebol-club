import { ICreateMatch, IMatcheGoals, IMatches } from '../interfaces/IMatches';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface IMatchesService {
  list(inProgress?: boolean): Promise<Matches[]>
  getById(id: number): Promise<Matches | null>
  create(data: IMatches): Promise<Matches | null>
  edit(id: number): Promise<[number, Matches[]]>
  editMatch(id: number, data: IMatcheGoals): Promise<[number, Matches[]]>
}

export default class MatchesService implements IMatchesService {
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

  // eslint-disable-next-line class-methods-use-this
  public async create(data: IMatches): Promise<Matches | null> {
    const newData: ICreateMatch = data as ICreateMatch;
    newData.inProgress = true;
    const match = await Matches.create(newData);
    return match;
  }

  // eslint-disable-next-line class-methods-use-this
  public async edit(id: number): Promise<[number, Matches[]]> {
    const match = await Matches.update({ inProgress: false }, { where: { id } });
    return match;
  }

  // eslint-disable-next-line class-methods-use-this
  public async editMatch(id: number, data: IMatcheGoals): Promise<[number, Matches[]]> {
    const match = await Matches.update(data, { where: { id } });
    return match;
  }
}
