import express from 'express';
import { proxyHandler } from '../controllers/proxy.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.all('/', verifyToken, proxyHandler);

export default router;
