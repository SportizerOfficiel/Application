const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schéma de création d'un club dans la base de données
 */
const ClubsSchema = new Schema({
  Name: { type: String, required: true },
  Sport: { type: String, required: true },
  Logo: { type: String, required: false }
},
{ timestamps: true });
// Avant l'enregistrement, normalise le nom en minuscules
ClubsSchema.pre("save", function (next) {
  if (this.Name) {
    this.Name = this.Name.toLowerCase();
  }
  next();
});

// Créez un index avec une option unique partiellement sensible à la casse
ClubsSchema.index({ Name: 1, Sport: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });

module.exports = mongoose.models.Clubs || mongoose.model("Clubs", ClubsSchema) ;
