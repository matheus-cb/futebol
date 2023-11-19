import { Request, Response, NextFunction } from 'express';
import TeamModel from '../models/TeamsModel';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const teamsModel = new TeamModel();

  const homeTeamExists = await teamsModel.findById(homeTeamId);
  const awayTeamExists = await teamsModel.findById(awayTeamId);

  if (!homeTeamExists || !awayTeamExists) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;
