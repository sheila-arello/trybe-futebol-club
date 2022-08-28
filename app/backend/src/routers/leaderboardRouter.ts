import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardConroller';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', (req, res) => leaderboardController.finalTableHT(req, res));
leaderboardRoutes.get('/away', (req, res) => leaderboardController.finalTableAT(req, res));
leaderboardRoutes.get('/', (req, res) => leaderboardController.totalPointsLeaderboard(req, res));

export default leaderboardRoutes;
