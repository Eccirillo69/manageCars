import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkRoleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userRole = decodedToken.role;

      if (userRole !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authorization token invalid' });
    }
  };
};
  