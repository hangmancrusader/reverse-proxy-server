import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Placeholder for routes
// import authRoutes from './routes/auth.routes';
// app.use('/api/auth', authRoutes);

export default app;
