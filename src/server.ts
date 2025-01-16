import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Import the database configuration
import "./config/database";

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json({ limit: "150mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routes
import V1 from './app/route/index.route';

app.use('/api/v1/', V1);
import './app/cron/checkStatusTodo.cron'

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});