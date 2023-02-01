/** @format */

import dbConnect from "../Client";
var Players = require("../Models/Players");
import HandleRequest from "@/Utils/HandleRequest";

const postPlayers = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Players(body);
  return await newModel.save();
});

const getPlayers = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.find();
  return data;
});

const getPlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findById(id);
  if (!data) throw new Error("Players not found");
  return data;
});

const putPlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Players not found");
  return data;
});

const deletePlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findByIdAndDelete(id);
  if (!data) throw new Error("Players not found");
  return data;
});

export { getPlayers, getPlayersById, putPlayersById, postPlayers, deletePlayersById };
