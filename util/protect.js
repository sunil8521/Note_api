import {high} from "./jwt.js"
import errorHandle from "../error/error.js";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import {promisify} from "util"
import Usermodel from "../model/Usermodel.js";

export const Protecter = high(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
 
  if (!token) {
    return next(
      new errorHandle(
        `You are not logged in! Please login to get access..`,
        401
      )
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT);
  const user = await Usermodel.findById(decode.id);
  if (!user) {
    return next(new errorHandle("This user no longer exist", 401));
  }
  req.user = user;
  next();
});