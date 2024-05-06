import Usermodel from "../model/Usermodel.js";
import errorHandle from "../error/error.js";
import { Sendtoken,high } from "../util/jwt.js";
export const UserLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new errorHandle("Provide password and email.", 400));
  }
  const user = await Usermodel.findOne({ username });
  if (!user || !(await user.PasswordChecker(password, user.password))) {
    return next(new errorHandle(`Incorrect email or password!`, 401));
  }
  Sendtoken(user, 200, res);
};

export const UserSignup = high(async (req, res, next) => {
  const newuser = await Usermodel.create(req.body);
  Sendtoken(newuser, 201, res);
})

export const UserSignout = (req, res) => {
  res.cookie("jwt", "signout", {
    expires: new Date(new Date(Date.now() + 10000)),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};