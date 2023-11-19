import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/teams', teamsRouter);
routes.use('/login', usersRouter);

export default routes;
