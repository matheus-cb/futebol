import MatchesModel from '../models/MatchModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IModelMatches } from '../Interfaces/matches/IModelMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { LeaderboardEntry } from '../Interfaces/leaderboards/ILeaderboardEntry';

type updateLeaderboardEntry = {
  entry: LeaderboardEntry,
  match: IMatches,
};

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

  private static initializeLeaderboardEntry(teamName: string): LeaderboardEntry {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static calculateMatchResults(entry: LeaderboardEntry, match: IMatches): LeaderboardEntry {
    const updatedEntry = { ...entry };

    if (match.homeTeamGoals > match.awayTeamGoals) {
      updatedEntry.totalPoints += 3;
      updatedEntry.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      updatedEntry.totalPoints += 1;
      updatedEntry.totalDraws += 1;
    } else {
      updatedEntry.totalLosses += 1;
    }

    return updatedEntry;
  }

  private static updateLeaderboardEntry(params: updateLeaderboardEntry): LeaderboardEntry {
    const { entry, match } = params;
    const updatedEntry = MatchService.calculateMatchResults(entry, match);

    updatedEntry.goalsFavor += match.homeTeamGoals;
    updatedEntry.goalsOwn += match.awayTeamGoals;
    updatedEntry.goalsBalance = updatedEntry.goalsFavor - updatedEntry.goalsOwn;
    updatedEntry.efficiency = parseFloat(
      ((updatedEntry.totalPoints / (updatedEntry.totalGames * 3)) * 100).toFixed(2),
    );
    return updatedEntry;
  }

  private static sortLeaderboard(leaderboardArray: LeaderboardEntry[]): LeaderboardEntry[] {
    return leaderboardArray.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public async calculateHomeLeaderboard(): Promise<LeaderboardEntry[]> {
    const matches = await this.matchesModel.findAllHomeFinishedMatches();
    const leaderboard = MatchService.calculateLeaderboard(matches);
    const sortedLeaderboard = Object.values(leaderboard);
    return MatchService.sortLeaderboard(sortedLeaderboard);
  }

  private static calculateLeaderboard(matches: IMatches[]): { [key: string]: LeaderboardEntry } {
    const leaderboard: { [key: string]: LeaderboardEntry } = {};

    matches.forEach((match) => {
      if (match.homeTeam && match.homeTeam.teamName) {
        const { teamName } = match.homeTeam;

        if (!leaderboard[teamName]) {
          leaderboard[teamName] = MatchService.initializeLeaderboardEntry(teamName);
        }

        MatchService.updateLeaderboardEntry({ entry: leaderboard[teamName], match });
      }
    });
    return leaderboard;
  }

  private static updateMatchOutcome(entry: LeaderboardEntry, match: IMatches): LeaderboardEntry {
    const updatedEntry = { ...entry };

    if (match.homeTeamGoals < match.awayTeamGoals) {
      updatedEntry.totalPoints += 3;
      updatedEntry.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      updatedEntry.totalPoints += 1;
      updatedEntry.totalDraws += 1;
    } else {
      updatedEntry.totalLosses += 1;
    }

    return updatedEntry;
  }

  private static updateGoalsAndEfficiency(
    entry: LeaderboardEntry,
    match: IMatches,
  ): LeaderboardEntry {
    return {
      ...entry,
      goalsFavor: entry.goalsFavor + match.awayTeamGoals,
      goalsOwn: entry.goalsOwn + match.homeTeamGoals,
      goalsBalance: entry.goalsFavor - entry.goalsOwn,
      efficiency: parseFloat(
        ((entry.totalPoints / (entry.totalGames * 3)) * 100).toFixed(2),
      ),
    };
  }

  private static updateScore(entry: LeaderboardEntry, match: IMatches): LeaderboardEntry {
    const entryWithOutcome = this.updateMatchOutcome(entry, match);
    return this.updateGoalsAndEfficiency(entryWithOutcome, match);
  }

  private static updateAwayLeaderboardEntry(
    entry: LeaderboardEntry,
    match: IMatches,
  ): LeaderboardEntry {
    const updatedEntry = this.updateScore(entry, match);
    return this.updateGoalsAndEfficiency(updatedEntry, match);
  }

  private static calculateUpdatedEntry(entry: LeaderboardEntry, match: IMatches): LeaderboardEntry {
    const updatedEntry = { ...entry };

    if (match.awayTeamGoals > match.homeTeamGoals) {
      updatedEntry.totalPoints += 3;
      updatedEntry.totalVictories += 1;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      updatedEntry.totalPoints += 1;
      updatedEntry.totalDraws += 1;
    } else {
      updatedEntry.totalLosses += 1;
    }

    updatedEntry.goalsFavor += match.awayTeamGoals;
    updatedEntry.goalsOwn += match.homeTeamGoals;
    updatedEntry.goalsBalance = updatedEntry.goalsFavor - updatedEntry.goalsOwn;
    updatedEntry.efficiency = parseFloat(
      ((updatedEntry.totalPoints / (updatedEntry.totalGames * 3)) * 100).toFixed(2),
    );

    return updatedEntry;
  }

  public async calculateAwayLeaderboard(): Promise<LeaderboardEntry[]> {
    const matches = await this.matchesModel.findAllAwayFinishedMatches();
    const leaderboard: { [key: string]: LeaderboardEntry } = {};

    matches.forEach((match) => {
      const { awayTeam } = match;
      if (awayTeam && awayTeam.teamName) {
        const { teamName } = awayTeam;

        if (!leaderboard[teamName]) {
          leaderboard[teamName] = MatchService.initializeLeaderboardEntry(teamName);
        }

        const entry = leaderboard[teamName];
        entry.totalGames += 1;
        const updatedEntry = MatchService.calculateUpdatedEntry(entry, match);
        leaderboard[teamName] = updatedEntry;
      }
    });

    const sortedLeaderboard = Object.values(leaderboard);
    return MatchService.sortLeaderboard(sortedLeaderboard);
  }
}
