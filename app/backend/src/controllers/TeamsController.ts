import { Request, Response } from 'express';
import TeamService from '../service/Teams.service';
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

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(Number(id));
    const status = mapStatusHTTP(team.status);
    return res.status(status).json(team.data);
  }
}
