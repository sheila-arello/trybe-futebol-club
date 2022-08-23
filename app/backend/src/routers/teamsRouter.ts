import { Router } from 'express';
// import verifyToken from '../middlewares/verifyToken';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/teamsController';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRoutes = Router();
// teamsRoutes.get('/', verifyToken, (req, res) => teamsController.list(req, res));
teamsRoutes.get('/:id', (req, res) => teamsController.getById(req, res));
teamsRoutes.get('/', (req, res) => teamsController.list(req, res));

export default teamsRoutes;
