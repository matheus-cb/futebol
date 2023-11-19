import * as jwt from 'jsonwebtoken';

interface ITokens { email: string; password: string; }

const secretKey = 'jwt_secret';

function generateTokens(payload: ITokens): string {
  const accessToken = jwt.sign(payload, secretKey);
  // console.log('generateTokens (accessToken) ->', accessToken);
  return accessToken;
}

function verifyToken(authHeader: string): ITokens {
  if (!authHeader) {
    return null as unknown as ITokens;
  }

  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, secretKey) as unknown as ITokens;
  console.log('verifyToken (payload) ->', payload);
  return payload;
}

export default {
  generateTokens,
  verifyToken,
};
