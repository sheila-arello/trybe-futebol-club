import Teams from '../database/models/teams';

export interface ITeamsService {
  list(): Promise<Teams[]>
  getById(id: number): Promise<Teams | null>
}

export default class UserService implements ITeamsService {
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
}
