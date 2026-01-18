import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import AthleteModel from "@/models/athlete";

export async function POST(req) {
  await dbConnect();
  try {
    const { athleteId, score } = await req.json();

    if (!athleteId || score === undefined) {
      return NextResponse.json(
        { success: false, message: "athleteId and score are required" },
        { status: 400 },
      );
    }

    const athlete = await AthleteModel.findById(athleteId);

    if (!athlete) {
      return NextResponse.json(
        { success: false, message: "Athlete not found" },
        { status: 404 },
      );
    }

    athlete.scores.push({ score: Number(score) });
    await athlete.save();

    return NextResponse.json({
      success: true,
      athlete,
    });
  } catch (error) {
    console.error("Add score error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
