import { connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const userDetail = async (email) => {
    try {

        const db = await connectDB();

        const user = await db
            .collection("User")
            .findOne({ email: email },);

        return user; // null if not found

    } catch (error) {
        throw new Error("Error fetching user details");
    }
};

export const createUser = async (data) => {
    try {
        const db = await connectDB();

        const result = await db.collection("User").insertOne({
            ...data,
            createdAt: new Date()
        });

        if (result && result.acknowledged) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.log("Insert Error:", err.message);
        return false;
    }
};

export const customer_exits = async (email, userId) => {
    try {
        const db = await connectDB();
        const user = await db
            .collection("customer")
            .findOne({
                email,
                userId: new ObjectId(userId)
            },);

        if (user) {
            return {
                "status": false,
                "customer": user,
                "message": "User already exists"
            }
        }
        return {
            "status": true
        }
    } catch (error) {
        console.log(err.message);
    }
}

export const createCustomer = async (email, userId, name) => {
    try {
        const db = await connectDB();

        const result = await db.collection("customer").insertOne({
            userId: new ObjectId(userId),
            email,
            name,
            status: "active",
            createdAt: new Date()
        });

        if (result && result.acknowledged) {
            return true;
        }

        return false;

    } catch (err) {
        console.log("Create Customer Error:", err.message);
        return false;
    }
};

export const customer_get = async (userId) => {
    try {
        const db = await connectDB();

        const customers = await db
            .collection("customer")
            .find({
                userId: new ObjectId(userId)
            })
            .toArray();

        return customers;

    } catch (err) {
        console.log("Customer Get Error:", err.message);
        return null;
    }
};