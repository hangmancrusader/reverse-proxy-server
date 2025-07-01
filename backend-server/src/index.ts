import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";

/*const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});*/
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
