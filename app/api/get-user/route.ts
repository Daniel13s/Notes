import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export async function POST(req: NextRequest) {
    const {email, password} = await req.json()
    const db = connectDB()
    const users = await db.collection('users').findOne({email, password})
    console.log(users)
    return NextResponse.json(users)
}