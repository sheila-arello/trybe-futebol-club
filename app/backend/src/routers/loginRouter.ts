import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import verifyToken from '../middlewares/verifyToken';

const userService = new UserService();
const userController = new UserController(userService);

const loginRoutes = Router();
// loginRoutes.get('/', userController.list); // this perde a referência assim, a menos que defina método como arrow function
loginRoutes.get('/validate', verifyToken);
loginRoutes.post('/', validateLogin, (req, res) => userController.login(req, res));

export default loginRoutes;
