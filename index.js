import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { config } from "dotenv";
config();
import { con } from "./db.js";
import errorHandle, { ErrorMiddleware } from "./error/error.js";
import Contentmodel from "./model/Contentmodel.js";
import { userR } from "./Route/userRoute.js";
import { dataR } from "./Route/dataRoute.js";
const app = express();
const port = process.env.PORT || 3001;
const date = new Date();
const isoString = date.toLocaleString().split(",")[0];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookieParser());

async function startserver() {
  try {
    await con("note");
    app.listen(port, () => {
      console.log("application started");
    });
  } catch (er) {
    console.log(er.message);
  }
}


app.get("/",  async (req, res) => {
  res.json({ status: true });
});

app.use("/user",userR)
app.use("/data",dataR)

app.all("*", (req, res, next) => {
  next(
    new errorHandle(
      `Can't find ${req.protocol}://${req.get("host")}${
        req.originalUrl
      } on server!`,
      404
    )
  );
});


app.use(ErrorMiddleware);
startserver();
