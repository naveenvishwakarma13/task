import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ override: true });

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@ac-fug0vdw.xpdw5cs.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});

let db;

export async function connectDB() {
  if (db) return db;

  try {
    console.log("🔄 Connecting to Atlas...");
    await client.connect();
    db = client.db(process.env.DBNAME);
    await db.command({ ping: 1 });
    console.log("✅ MongoDB Atlas CONNECTED SUCCESSFULLY!");
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
}
