import MatchesModel from '../models/MatchModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IModelMatches } from '../Interfaces/matches/IModelMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  private matchesModel: IModelMatches;

  constructor() {
    this.matchesModel = new MatchesModel();
  }

  public async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatches | null>> {
    const match = await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<void>> {
    const finishedMatch = await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: finishedMatch };
  }

  public async updateMatch(
    id: number,
    goals: { homeTeamGoals: number, awayTeamGoals: number },
  ): Promise<ServiceResponse<void>> {
    await this.matchesModel.updateMatch(id, goals);
    return { status: 'SUCCESSFUL', data: undefined };
  }

  public async createMatch(matchData: IMatches): Promise<IMatches> {
    const newMatch = await this.matchesModel.create(matchData);
    return newMatch;
  }
}
