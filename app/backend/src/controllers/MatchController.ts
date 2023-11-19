import { Request, Response } from 'express';
import MatchService from '../service/Matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    let inProgress: string | undefined;

    if (typeof req.query.inProgress === 'string') {
      inProgress = req.query.inProgress;
    }

    const matches = await this.matchService.getAllMatches(inProgress);
    const status = mapStatusHTTP(matches.status);
    return res.status(status).json(matches.data);
  }

  public async getMatchById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const match = await this.matchService.getMatchById(Number(id));
    const status = mapStatusHTTP(match.status);
    return res.status(status).json(match.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const finishedMatch = await this.matchService.finishMatch(Number(id));
    const status = mapStatusHTTP(finishedMatch.status);
    return res.status(status).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatch(Number(id), { homeTeamGoals, awayTeamGoals });
    return res.status(200).json({ message: 'Match updated successfully' });
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const matchData = req.body;
    const newMatch = await this.matchService.createMatch(matchData);
    return res.status(201).json(newMatch);
  }
}
