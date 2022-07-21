declare namespace Express {
  interface Request {
    user: any;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
    isActive: () => boolean;
    isOwner: (userId: string | number) => boolean;
    newFunc: (code: number) => number;
  }
}
