import mongoose from "mongoose";
import bcrypt from "bcrypt";
const blue_print = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

blue_print.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
blue_print.methods.PasswordChecker = async function (
  enterPassword,
  hashPassword
) {
  return await bcrypt.compare(enterPassword, hashPassword);
};

const Usermodel = mongoose.model("user", blue_print);
export default Usermodel;
