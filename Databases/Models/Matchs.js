const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  Date: { type: Date, required: true },
  Sport: { type: String, required: true },
  Category: { type: String, required: true },
  OutSideScore: { type: Number, required: true },
  HomeSideScore: { type: Number, required: true },
  OutSideFault: { type: Number, required: true },
  HomeSideFault: { type: Number, required: true },
  Duration: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  IdHomeSide: { type: Schema.Types.ObjectId, ref: "Clubs", required: true },
  IdOutSide: { type: Schema.Types.ObjectId, ref: "Clubs", required: true }
});

module.exports = mongoose.model("Match", MatchSchema);
