import { Request, Response } from 'express';
import TeamService from '../service/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getAllTeams();
    const status = mapStatusHTTP(teams.status);
    return res.status(status).json(teams.data);
  }
}
