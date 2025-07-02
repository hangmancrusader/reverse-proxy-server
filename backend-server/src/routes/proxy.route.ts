import express from "express";
import { proxyHandler } from "../controllers/proxy.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { logRequestMiddleware } from "../middleware/log.middleware";

const router = express.Router();

router.all("/{*path}", logRequestMiddleware, verifyToken, proxyHandler);

export default router;
