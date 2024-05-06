import express from "express";
import { UserLogin, UserSignup,UserSignout } from "../functons/userFunction.js";

export const userR = express.Router();

userR.post("/signup", UserSignup);
userR.post("/login", UserLogin);
userR.get("/signout", UserSignout);


