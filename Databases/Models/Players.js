const mongoose = require('mongoose');

/**
 * Schéma de création d'un joueur dans la base de données
 */
const PlayersSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  FirstName: { type: String, required: true },
  MatchsPlayed: { type: Number, required: true },
  Category: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  idClub: { type: Schema.Types.ObjectId, ref: "Clubs", required: true }
});

module.exports = mongoose.models.Players || mongoose.model("Players", PlayersSchema) ;
