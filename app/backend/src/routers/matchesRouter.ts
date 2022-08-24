import { Router } from 'express';
// import verifyToken from '../middlewares/verifyToken';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matchesRoutes = Router();
// matchesRoutes.get('/:id', (req, res) => matchesController.getById(req, res));
matchesRoutes.get('/', (req, res) => matchesController.list(req, res));

export default matchesRoutes;
