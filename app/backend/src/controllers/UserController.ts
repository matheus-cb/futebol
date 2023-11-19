import { Request, Response } from 'express';
import UserModel from '../models/UsersModel';
import UsersService from '../service/Users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JwtUtils from '../utils/Jwt';

export default class UserController {
  private usersService: UsersService;
  private userModel: UserModel;

  constructor() {
    this.usersService = new UsersService();
    this.userModel = new UserModel();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await this.userModel.findUserByEmail(email);

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const response = await this.usersService.findByEmailWithPassword(email, password);

    // Verifica se a senha está correta
    if (response.status === 'INVALID_DATA') {
      return res.status(401).json(response.data);
    }

    const status = mapStatusHTTP(response.status);
    return res.status(status).json(response.data);
  };

  public async findByEmail(req: Request, res: Response) {
    const { authorization } = req.headers;

    const userVerified = JwtUtils.verifyToken(authorization as string);
    const user = await this.usersService.findByEmail(userVerified.email);
    const status = mapStatusHTTP(user.status);
    return res.status(status).json({ role: user.data });
  }
}
