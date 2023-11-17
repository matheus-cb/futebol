import { ITeam } from '../Interfaces/teams/ITeam';
import { IModelTeams } from '../Interfaces/teams/IModelTeams';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel implements IModelTeams {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map((teams) => teams.toJSON());
  }
}
