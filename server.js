import express from "express";
import mongoose from "mongoose";
import { con } from "./db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
const date = new Date();
const isoString = date.toLocaleString().split(",")[0];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));
let Item;
const blue_print = {
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
  },
};
async function startserver() {
  try {
    await con("note");
    Item = mongoose.model("task", blue_print);
    app.listen(port,"192.168.1.4", () => {
      console.log("application started");
    });
  } catch (er) {
    console.log(er.message);
  }
}
async function fetch() {
  return await Item.find({});
}
app.get("/", async (req, res) => {
  res.json({ message: "Hello, there!" });
});
app.get("/get", async (req, res) => {
  let val = await fetch();
  res.json(val);
});
app.post("/add", async (req, res) => {
  try {
    const newItem = await new Item({
      title: req.body.title,
      content: req.body.content,
      date: isoString,
    }).save();
    res.status(201).json(newItem);
  } catch (er) {
    console.log(er.message);
  }
});
app.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingPost = await Item.findById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedTitle = req.body.title || existingPost.title;
    const updatedContent = req.body.content || existingPost.content;
    const updatedPost = await Item.findByIdAndUpdate(
      id,
      {
        title: updatedTitle,
        content: updatedContent,
        date: isoString,
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/del/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (deletedItem) {
      res
        .status(200)
        .json({ message: "Item deleted successfully", deletedItem });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
startserver();
