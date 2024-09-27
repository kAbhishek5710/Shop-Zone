import express from "express";
import mongoose from "mongoose";
import authRouter from "./Routes/auth.route.js";
import clientRouter from "./Routes/client.route.js";
import productRouter from "./Routes/product.route.js";
import cartRouter from "./Routes/cart.route.js";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});

app.get("/", (req, res) => {
  res.send("Shop Zone is set up Successully!!");
});

app.use("/server/auth", authRouter);
app.use("/server/client", clientRouter);
app.use("/server/product", productRouter);
app.use("/server/cart", cartRouter);
