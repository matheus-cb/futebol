import { IMatches } from '../Interfaces/matches/IMatches';
import { IModelMatches } from '../Interfaces/matches/IModelMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

function buildFilter(inProgress?: string) {
  if (inProgress !== undefined) {
    return {
      where: {
        inProgress: inProgress === 'true',
      },
    };
  }
  return {};
}

export default class MatchesModel implements IModelMatches {
  private model = SequelizeMatch;

  public async create(data: IMatches): Promise<IMatches> {
    const newMatch = await this.model.create({
      ...data,
      inProgress: true,
    });
    return newMatch.toJSON();
  }

  public async findAll(inProgress?: string): Promise<IMatches[]> {
    const filter = buildFilter(inProgress);

    const dbData = await this.model.findAll({
      ...filter,
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

    return dbData.map((matches) => matches.toJSON());
  }

  public async findById(id: number): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);

    return dbData ? dbData.toJSON() : null;
  }

  // public async update(id: number, data: IMatches): Promise<IMatches | null> {
  //   const dbData = await this.model.update(data, { where: { id } });

  //   return dbData ? data : null;
  // }

  // public async delete(id: number): Promise<number> {
  //   const dbData = await this.model.destroy({ where: { id } });

  //   return dbData;
  // }

  // Especific method
  public async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(
    id: number,
    goals: { homeTeamGoals: number, awayTeamGoals: number },
  ): Promise<void> {
    await this.model.update(goals, { where: { id, inProgress: true } });
  }
}
