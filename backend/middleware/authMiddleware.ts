import { verify } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';

interface IDecoded {
  userId: string;
  iat: number;
  exp: number;
}

// Extend the Request interface to include the user property
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}


const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        console.log('Verifying token:', token);
        console.log('Using secret:', process.env.ACCESS_TOKEN_SECRET);

        const decoded = verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!
        ) as IDecoded;

        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
