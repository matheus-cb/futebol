import { Request, Response, NextFunction } from 'express';

class LoginValidation {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default LoginValidation;
