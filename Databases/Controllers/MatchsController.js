/** @format */

import dbConnect from "../Client";
var Matchs = require("../Models/Matchs");
import HandleRequest from "@/Utils/HandleRequest";

const postMatchs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Matchs(body);
  return await newModel.save();
});

const getMatchs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.find();
  return data;
});

const getMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findById(id);
  if (!data) throw new Error("Matchs not found");
  return data;
});

const putMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Matchs not found");
  return data;
});

const deleteMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findByIdAndDelete(id);
  if (!data) throw new Error("Matchs not found");
  return data;
});

export { getMatchs, getMatchsById, putMatchsById, postMatchs, deleteMatchsById };
