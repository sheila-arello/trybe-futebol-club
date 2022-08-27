import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardConroller';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', (req, res) => leaderboardController.totalPoints(req, res));

export default leaderboardRoutes;
