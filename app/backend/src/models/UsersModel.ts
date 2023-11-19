import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    const dbData = user.toJSON();

    return dbData;
  }
}
