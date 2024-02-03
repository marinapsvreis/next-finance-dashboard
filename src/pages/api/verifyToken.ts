import { NextApiRequest, NextApiResponse } from 'next';
import AuthService from '@/services/auth-token';

const verifyTokenMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const user = await AuthService.openSessionToken(token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    return res.status(200).json({ message: 'Token verified' });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default verifyTokenMiddleware;
