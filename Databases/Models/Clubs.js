const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubsSchema = new Schema({
  Name: { type: String, required: true },
  Ville: { type: String, required: true },
  Logo: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  Color: { type: String, required: true }
});

module.exports = mongoose.model("Clubs", ClubsSchema);
