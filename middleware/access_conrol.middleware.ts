import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  req.isAuthenticated = () => {
    if (req.user) {
      return true;
    }
    return false;
  };
  req.isAdmin = () => {
    return req.user.isAdmin;
  };
  req.isActive = () => {
    if (req.user && req.user.isActive) {
      return true;
    }
    return false;
  };
  req.isOwner = (userId: string | number) => {
    if (req.user && req.user.id === userId) {
      return true;
    }
    return false;
  };

  next();
};
