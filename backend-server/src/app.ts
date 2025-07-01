import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route"; // Adjust the import path as necessary
import proxyRouter from "./routes/proxy.route"; // Adjust the import path as necessary
import logRoutes from "./routes/log.route"; // Adjust the import path as necessary
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/auth', authRouter);
app.use('/api/proxy', proxyRouter);
app.use('/api/logs', logRoutes);
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Placeholder for routes
// import authRoutes from './routes/auth.routes';
// app.use('/api/auth', authRoutes);

export default app;
