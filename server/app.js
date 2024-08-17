import express from "express";
import mongoose from "mongoose";
import authRouter from "./Routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});

app.get("/", (req, res) => {
  res.send("Shop Zone is set up Successully!!");
});

app.use("/server/auth", authRouter);
