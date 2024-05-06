import mongoose from "mongoose";
import Usermodel from "./Usermodel.js";
const blue_print = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel",
    required: [true, "User id must be required."],
  },
});
const Contentmodel = mongoose.model("task", blue_print);
export default Contentmodel;
