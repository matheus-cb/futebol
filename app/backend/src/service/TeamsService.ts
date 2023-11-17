import TeamsModel from '../models/TeamsModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { IModelTeams } from '../Interfaces/teams/IModelTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  private teamsModel: IModelTeams;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
