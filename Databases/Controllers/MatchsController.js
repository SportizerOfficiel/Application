/** @format */
/**
 * Controller pour les Matchs
 */

import dbConnect from "../Client";
var Matchs = require("../Models/Matchs");
import HandleRequest from "@/Utils/HandleRequest";

/**
 * Création d'un nouveau match
 */
const postMatchs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Matchs(body);
  return await newModel.save();
});

/**
 * Récupération des matchs
 */
const getMatchs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.find();
  return data;
});

/**
 * Récupération d'un match
 */
const getMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findById(id);
  if (!data) throw new Error("Matchs not found");
  return data;
});

/**
 * Modification d'un match
 */
const putMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Matchs not found");
  return data;
});

/**
 * Suppression d'un match
 */
const deleteMatchsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Matchs.findByIdAndDelete(id);
  if (!data) throw new Error("Matchs not found");
  return data;
});

export { getMatchs, getMatchsById, putMatchsById, postMatchs, deleteMatchsById };
