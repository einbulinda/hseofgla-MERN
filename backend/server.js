import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

// use environment variables
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Allow cross origin requests
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const databaseUrl = process.env.DB_URL;
const port = process.env.PORT || 5000;

// Connect the DB

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
