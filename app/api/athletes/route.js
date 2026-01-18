import dbConnect from "@/lib/db";
import AthleteModel from "@/models/athlete";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const { name, age, sport } = await req.json();
    const athlete = await AthleteModel.create({ name, age, sport });

    return NextResponse.json({ athlete, success: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const athletes = await AthleteModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ athletes, success: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function PATCH(req) {
  await dbConnect();

  try {
    const { athleteId, name, age, sport } = await req.json();

    if (!athleteId) {
      return NextResponse.json(
        { success: false, message: "athleteId is required" },
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

    if (name !== undefined) athlete.name = name;
    if (age !== undefined) athlete.age = age;
    if (sport !== undefined) athlete.sport = sport;

    await athlete.save();

    return NextResponse.json({
      success: true,
      athlete,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  await dbConnect();
  try {
    const { athleteId } = await req?.json();

    if (!athleteId) {
      return NextResponse.json({
        message: "Athlete is required",
        success: false,
      });
    }

    const deletedAthlete = await AthleteModel.findByIdAndDelete(athleteId);

    if (!deletedAthlete) {
      return NextResponse.json({
        message: "Athlete not found",
        success: false,
      });
    }

    return NextResponse.json({ deletedAthlete, success: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
