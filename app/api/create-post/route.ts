import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {email, note} = await req.json()
    const db = connectDB()
    const update = note
    const posts = await db.collection("users").updateOne({email}, {$push: {posts: update}})
    console.log(note)

    return NextResponse.json(posts)
}