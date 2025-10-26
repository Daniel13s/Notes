import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {name, email, password} = await req.json()
    const db = connectDB()
    const user = await db.collection("users").insertOne({name, email, password, posts: []})

    return NextResponse.json(user)
}