/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema(
  {
    Sport: { type: String, required: true },
    Category: { type: String, required: true },
    Duration: { type: Number, required: true },
    HomeSideClub: { type: Schema.Types.ObjectId, ref: "Clubs", required: true },
    OutSideClub: { type: Schema.Types.ObjectId, ref: "Clubs", required: true },
    HomeSidePlayers: [
      {
        player: { type: Schema.Types.ObjectId, ref: "Players", required: true },
        isSub: { type: Boolean, default: false },
        points: [
          {
            type: { type: String, required: true },
            value: { type: Number, required: true },
          },
        ],
        faults: [
          {
            type: { type: String, required: true },
            value: { type: Number, required: true },
          },
        ],
      },
    ],
    OutSidePlayers: [
      {
        player: { type: Schema.Types.ObjectId, ref: "Players", required: true },
        isSub: { type: Boolean, default: false },
        points: [
          {
            type: { type: String, required: true },
            value: { type: Number, required: true },
          },
        ],
        faults: [
          {
            type: { type: String, required: true },
            value: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Calculer le score de l'équipe à domicile
MatchSchema.virtual("HomeSideScore").get(function () {
  let score = 0;
  this.HomeSidePlayers.forEach((player) => {
    player.points.forEach((point) => {
      score += point.value;
    });
  });
  return score;
});

// Calculer le score de l'équipe à l'extérieur
MatchSchema.virtual("OutSideScore").get(function () {
  let score = 0;
  this.OutSidePlayers.forEach((player) => {
    player.points.forEach((point) => {
      score += point.value;
    });
  });
  return score;
});

// Calculer la faute de l'équipe à domicile
MatchSchema.virtual("HomeSideFault").get(function () {
  let fault = 0;
  this.HomeSidePlayers.forEach((player) => {
    player.faults.forEach((f) => {
      fault += f.value;
    });
  });
  return fault;
});

// Calculer la faute de l'équipe à l'extérieur
MatchSchema.virtual("OutSideFault").get(function () {
  let fault = 0;
  this.OutSidePlayers.forEach((player) => {
    player.faults.forEach((f) => {
      fault += f.value;
    });
  });
  return fault;
});

module.exports = mongoose.models.Match || mongoose.model("Match", MatchSchema);
