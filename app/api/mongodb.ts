import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!

const client = new MongoClient(uri)

export const connectDB = () => {
    client.connect()
    const db = client.db("Cadastro")
    return db
}


