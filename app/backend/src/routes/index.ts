import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matchRouter from './matches.routes';

const routes = Router();

routes.use('/teams', teamsRouter);
routes.use('/login', usersRouter);
routes.use('/matches', matchRouter);

export default routes;
