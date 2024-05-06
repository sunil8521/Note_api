import Contentmodel from "../model/Contentmodel.js";
import errorHandle from "../error/error.js";
import { high } from "../util/jwt.js";

export const GetNote = high(async (req, res, next) => {
  const user = req.user;
  const notes = await Contentmodel.find({ user: user._id });
  res.json({ notes });
});

export const AddNote = high(async (req, res, next) => {
  const user = req.user;
  const { title, content } = req.body;
  const note = await Contentmodel.create({ title, content, user: user._id });
  res.status(201).json({ status: "success" });
});
