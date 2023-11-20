import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matchRouter from './matches.routes';
import leaderBoardRouter from './leaderboard.routes';

const routes = Router();

routes.use('/teams', teamsRouter);
routes.use('/login', usersRouter);
routes.use('/matches', matchRouter);
routes.use('/leaderboard', leaderBoardRouter);

export default routes;
