declare namespace Express {
  interface Request {
    // user:
    //   | {
    //       id: string | number;
    //       isAdmin: boolean;
    //       isActive: boolean;
    //     }
    //   | undefined;
    user: any;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
    isActive: () => boolean;
    isOwner: (userId: string | number) => boolean;
  }
}
