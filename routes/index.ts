import { Router, Request, Response, NextFunction } from 'express';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';

// local imports
import schema from '../schema';
import authRouter from './auth.router';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Welcome To The Blog API',
  });
});

router.use('/auth', authRouter);

router.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

router.get(
  '/playground',

  expressPlayground({ endpoint: '/graphql' })
);

export default router;
