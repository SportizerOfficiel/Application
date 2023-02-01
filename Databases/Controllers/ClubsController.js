/** @format */

import dbConnect from "../Client";
var Clubs = require("../Models/Clubs");
import HandleRequest from "@/Utils/HandleRequest";

const postClubs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Clubs(body);
  return await newModel.save();
});

const getClubs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.find();
  return data;
});

const getClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findById(id);
  if (!data) throw new Error("Clubs not found");
  return data;
});

const putClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Clubs not found");
  return data;
});

const deleteClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findByIdAndDelete(id);
  if (!data) throw new Error("Clubs not found");
  return data;
});

export { getClubs, getClubsById, putClubsById, postClubs, deleteClubsById };
