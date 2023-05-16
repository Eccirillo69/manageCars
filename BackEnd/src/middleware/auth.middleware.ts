import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; username: string; role: string };

    const user = await prisma.person.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      req["user"] = user;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};
