import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/constant.js"


export const hashPassword = async (Password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashed = await bcrypt.hash(Password, salt);
        return hashed;
    } catch (error) {
        console.log(error)
        throw new Error("Error hashing password");
    }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; // true / false
    } catch (error) {
        throw new Error("Error comparing password");
    }
};