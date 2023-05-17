const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma de création d'un joueur dans la base de données
 */
const PlayersSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Category: { type: String, required: true },
  Numero:{ type: Number, required: true },
  idClub: { type: Schema.Types.ObjectId, ref: "Clubs", required: false }
},
{ timestamps: true });

module.exports = mongoose.models.Players || mongoose.model("Players", PlayersSchema) ;
