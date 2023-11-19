import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import AuthValidator from '../middlewares/AuthValidation';
import validateMatch from '../middlewares/MatchValidation';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

matchRouter.get(
  '/:id',
  (req: Request, res: Response) => matchController.getMatchById(req, res),
);

matchRouter.patch(
  '/:id/finish',
  AuthValidator.validate,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  AuthValidator.validate,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

matchRouter.post(
  '/',
  AuthValidator.validate,
  validateMatch,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default matchRouter;
