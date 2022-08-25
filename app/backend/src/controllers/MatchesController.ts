/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { Request, Response } from 'express';
import NotFoundError from '../middlewares/NotFoundError';
import { IMatches } from '../interfaces/IMatches';
import { IMatchesService } from '../services/MatchesService';
import { ITeamsService } from '../services/TeamsService';

export default class MatchesController {
  constructor(
    private matchesService: IMatchesService,
    private teamsService: ITeamsService,
  ) { }

  async list(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    let matches = [];
    if (inProgress !== undefined) {
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

  async create (req: Request, res: Response): Promise<void> {
    // const validatedData = petsService.validateBody(req.body);
    const data = req.body as IMatches;
    if (data.awayTeam === data.homeTeam) {
      throw new NotFoundError('It is not possible to create a match with two equal teams');
    }
    await this.teamsService.checkIfExists(data);
    const match = await this.matchesService.create(data);
    res.status(201).json(match);
  }

  async edit(req: Request, res: Response): Promise<void> {
    // const [{ id }, changes] = await Promise.all([
    //   blogPostsService.validateParamsId(req.params),
    //   blogPostsService.validateBodyEdit(req.body),
    // ]);
    const { id } = req.params;
    const result = await this.matchesService.edit(Number(id));
    if (result[0] === 0) throw new NotFoundError('Not found');
    // const post = await blogPostsService.getOnlyBlogPost(id);
    // // Recupera o ID do usuario a partir do token e compara com o userId do post
    // const { userId } = res;
    // if (post.userId !== userId) throwUnauthorizedError('Unauthorized user');
    res.status(200).json({ message: 'Finished' });
  }
}
