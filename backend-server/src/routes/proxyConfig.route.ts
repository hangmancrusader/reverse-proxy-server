import express from "express";
import {
  getProxyConfig,
  updateProxyConfig
} from "../controllers/proxyConfig.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", verifyToken, getProxyConfig);
router.patch("/", verifyToken, updateProxyConfig);

export default router;
