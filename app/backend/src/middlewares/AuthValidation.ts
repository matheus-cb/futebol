import { Request, Response, NextFunction } from 'express';
import JwtUtils from '../utils/Jwt';

// const secret = process.env.JWT_SECRET || 'secret';

class AuthValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      // console.log('Token not found');
      return res.status(401).json({ message: 'Token not found' });
    }

    // console.log('token ->', token);

    try {
      // console.log('entrou no try');
      const decoded = JwtUtils.verifyToken(token);
      console.log('decoded ->', decoded);
      res.locals.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthValidator;
