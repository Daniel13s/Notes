import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {note} = await req.json()
    const db = connectDB()
    const noteUpdate = note
    const notesUpdate = await db.collection('users').updateOne({"posts.id": noteUpdate.id}, {$set: {"posts.$": noteUpdate}})

    return NextResponse.json(notesUpdate)
}