import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "2d",
  });
};
export const verifyToken = async (token, secret) => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    throw error;
  }
};

export const Sendtoken = (user, statuscode, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  });
  res.status(statuscode).json({
    status: "success",
    token,
  });
};

export const high = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};