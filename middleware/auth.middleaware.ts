import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../controllers/auth.controller';

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    try {
      // TODO: Only return the jsonpayload
      const decoded = verifyToken(token);
      req.user = decoded;

      next();
    } catch (err) {
      // TODO: Handle error properly
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
};

export default authenticate;
