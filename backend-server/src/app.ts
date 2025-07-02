import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import proxyRouter from "./routes/proxy.route";
import logRoutes from "./routes/log.route";
import proxyConfigRoutes from "./routes/proxyConfig.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/api/proxy", proxyRouter);
app.use("/api/logs", logRoutes);
app.use("/api/proxy/config", proxyConfigRoutes);
app.get("/", (req, res) => {
  res.send("API is working");
});

export default app;
