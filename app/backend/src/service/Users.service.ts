import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser } from '../Interfaces/users/IUser';
import jwtUtils from '../utils/Jwt';
import UserModel from '../models/UsersModel';

type Token = { token: string };

const message = 'Invalid email or password';

export default class UsersService {
  private userModel: IUserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async findByEmailWithPassword(
    email: string,
    password: string,
  ): Promise<ServiceResponse<Token>> {
    const user = await this.userModel.findUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return {
        status: 'INVALID_DATA',
        data: { message },
      };
    }

    const token = jwtUtils.generateTokens({ email, password });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findByEmail(
    email: string,
  ): Promise<ServiceResponse<IUser['role'] | null>> {
    const user = await this.userModel.findUserByEmail(email);
    return { status: 'SUCCESSFUL', data: user?.role || null };
  }
}
