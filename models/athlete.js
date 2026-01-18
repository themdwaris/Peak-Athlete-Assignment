import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const AthleteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    scores: {
      type: [ScoreSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const AthleteModel =
  mongoose.models.Athlete || mongoose.model("Athlete", AthleteSchema);
export default AthleteModel;
