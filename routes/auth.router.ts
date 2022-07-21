import { Router, Request, Response, NextFunction } from 'express';
import { register, login, checkAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/',  checkAuth);
router.post('/register', register);
router.post('/login', login);

export default router;
