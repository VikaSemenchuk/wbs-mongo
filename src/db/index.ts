import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error("Problem with URI")
}

const client = new MongoClient(URI);

try {
    await client.connect();
} catch (err) {
    process.env.NODE_ENV !== "production" && console.error("MongoDB conection error:", err)
    process.exit(1)
}

export const db = client.db();