import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import LoginValidation from '../middlewares/LoginValidation';
import AuthValidation from '../middlewares/AuthValidation';

const userController = new UserController();

const usersRouter = Router();

usersRouter.post(
  '/',
  LoginValidation.validate,
  (req: Request, res: Response) => userController.login(req, res),
);

usersRouter.get(
  '/role',
  AuthValidation.validate,
  (req: Request, res: Response) => userController.findByEmail(req, res),
);

export default usersRouter;
