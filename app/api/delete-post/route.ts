import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {id, email} = await req.json();
    const db = connectDB()
    const deleteNote = await db.collection("users").updateOne({email: email}, {$pull: {posts: {id}}})
    return NextResponse.json(deleteNote)
}