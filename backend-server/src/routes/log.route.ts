import express from 'express';
import { getLogs } from '../controllers/log.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', verifyToken, getLogs);

export default router;
