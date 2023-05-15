/** @format */
/**
 * Controller pour les joueurs 
 */

import dbConnect from "../Client";
var Players = require("../Models/Players");
import HandleRequest from "@/Utils/HandleRequest";

/**
 * Création d'un nouveau joueur
 */
const postPlayers = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Players(body);
  return await newModel.save();
});

/**
 * Récupération des joueurs
 */
const getPlayers = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.find();
  return data;
});

/**
 * Récupération d'un joueur
 */
const getPlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findById(id);
  if (!data) throw new Error("Players not found");
  return data;
});

/**
 * Modification d'un joueur
 */
const putPlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Players not found");
  return data;
});

/**
 * Suppression d'un joueur
 */
const deletePlayersById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Players.findByIdAndDelete(id);
  if (!data) throw new Error("Players not found");
  return data;
});

/**
 * Recherche des joueurs
 */
 const searchPlayers = HandleRequest(async ({ body }) => {
  await dbConnect();
  console.log("searching",data)
  const data = await Players.find({ Name: { $regex: body, $options: 'i' } });
  return data;
});

export { getPlayers, getPlayersById, putPlayersById, postPlayers, deletePlayersById,searchPlayers };
