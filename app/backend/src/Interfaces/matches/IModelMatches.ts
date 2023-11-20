import { ICRUDModel } from '../ICRUDModel';
import { IMatches } from './IMatches';

export type IModelMatches = ICRUDModel<IMatches> & {
  findAll(inProgress?: string): Promise<IMatches[]>;
  finishMatch(id: number): Promise<void>;
  updateMatch(id: number, goals: { homeTeamGoals: number, awayTeamGoals: number }): Promise<void>;
  findAllHomeFinishedMatches(): Promise<IMatches[]>;
  findAllAwayFinishedMatches(): Promise<IMatches[]>;
};
