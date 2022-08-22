import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userService = new UserService();
const userController = new UserController(userService);

const loginRoutes = Router();
// router.get('/', userController.list); // this perde a referência assim, a menos que defina método como arrow function
// loginRoutes.get('/', (req, res) => userController.list(req, res));
loginRoutes.post('/', validateLogin, (req, res) => userController.login(req, res));

// loginRoutes.post('/', validateLogin, userController.login);

export default loginRoutes;
