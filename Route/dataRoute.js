import express from "express";
import { GetNote, AddNote } from "../functons/dataFunction.js";
import {Protecter} from "../util/protect.js"
export const dataR = express.Router();

dataR.get("/get",Protecter, GetNote);
dataR.post("/add",Protecter, AddNote);
