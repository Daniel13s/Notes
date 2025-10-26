import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {email} = await req.json()
    const db = connectDB()
    const notes = await db.collection("users").findOne({email})

    return NextResponse.json(notes)
}