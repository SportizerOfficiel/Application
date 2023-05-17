/** @format */
/**
 * Controller pour les clubs
 */

import dbConnect from "../Client";
var Clubs = require("../Models/Clubs");
var Matchs = require("../Models/Matchs");
var Players = require("../Models/Players");
import HandleRequest from "@/Utils/HandleRequest";

/**
 * Création d'un nouveau club
 */
const postClubs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const newModel = new Clubs(body);
  return await newModel.save();
});

/**
 * Récupération des clubs
 */
const getClubs = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.find();
  return data;
});

/**
 * Récupération d'un club
 */
const getClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findById(id);
  if (!data) throw new Error("Clubs not found");
  return data;
});

/**
 * Modification un club
 */
const putClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("Clubs not found");
  return data;
});

/**
 * Suppression d'un club
 */
const deleteClubsById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await Clubs.findByIdAndDelete(id);
  if (!data) throw new Error("Clubs not found");
  return data;
});
/**
 * Recherche de club par nom
 */
 const searchClubByName = HandleRequest(async ({ body }) => {
  await dbConnect();

  // Vous pouvez utiliser une expression régulière pour effectuer une recherche insensible à la casse
  const regex = new RegExp(body, 'i'); 

  const data = await Clubs.find({ Name: regex });

  return data;
});

/**
 * Récupération d'un club avec les joueurs du dernier match
 */
 const getLastMatchPlayersByClubAndCateg = HandleRequest(async ({ body, id }) => {
  await dbConnect();
    console.log("OKEYFEFE")
  // Retrieve the club data
  const club = await Clubs.findById(id);
  if (!club) throw new Error("Club not found");

  const lastMatch = await Matchs.findOne({
    $or: [
      { HomeSideClub: id, Category: body },
      { OutSideClub: id, Category: body },
    ],
  }).sort({ Date: -1 });

  if (!lastMatch) {
    return [];
  }


 // Get the player IDs from the lastMatch HomeSidePlayers and OutSidePlayers
 const homeSidePlayerIds = lastMatch.HomeSidePlayers.map((player) => player.player);
 const outSidePlayerIds = lastMatch.OutSidePlayers.map((player) => player.player);

 // Combine the player IDs
 const playerIds = [...homeSidePlayerIds, ...outSidePlayerIds];

 // Fetch the player documents using the playerIds
 const clubPlayers = await Players.find({
   _id: { $in: playerIds },
   idClub: id,
 });


   // Separate the players based on the isSub property
   const regularPlayers = [];
   const substitutePlayers = [];
   clubPlayers.forEach((player) => {
     const matchedPlayer = clubPlayers.find((p) => p._id.toString() === player.id.toString());
     if (matchedPlayer) {
       if (player.isSub) {
         substitutePlayers.push(matchedPlayer);
       } else {
         regularPlayers.push(matchedPlayer);
       }
     }
   });
 
   // Return the regular and substitute player data
   return { regularPlayers, substitutePlayers };
});


export { getClubs, getClubsById, putClubsById, postClubs, deleteClubsById,searchClubByName,getLastMatchPlayersByClubAndCateg };
