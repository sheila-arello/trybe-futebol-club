import { Router } from 'express';
// import verifyToken from '../middlewares/verifyToken';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import verifyToken from '../middlewares/verifyToken';
import TeamsService from '../services/TeamsService';

const matchesService = new MatchesService();
const teamsService = new TeamsService();
const matchesController = new MatchesController(matchesService, teamsService);

const matchesRoutes = Router();
// matchesRoutes.get('/:id', (req, res) => matchesController.getById(req, res));
matchesRoutes.patch(
  '/:id/finish',
  verifyToken,
  (req, res) => matchesController.edit(req, res),
);
matchesRoutes.patch(
  '/:id',
  verifyToken,
  (req, res) => matchesController.editMatch(req, res),
);
matchesRoutes.get('/', (req, res) => matchesController.list(req, res));
matchesRoutes.post('/', verifyToken, (req, res) => matchesController.create(req, res));

export default matchesRoutes;
