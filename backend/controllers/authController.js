import * as authservies from "../servies/authservies.js"
import { error, success } from "../helpers/response.helper.js";
import { hashPassword, comparePassword } from "../helpers/password.helper.js";
import { generateToken } from "../helpers/jwt.helper.js"
export const Userregister = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await authservies.userDetail(email);
        if (exists) {
            return error(res, "Email already exists", 400);
        }
        const hashed = await hashPassword(password);
        const userData = {
            email,
            password: hashed,
            status: "active"
        };
        const create_user = await authservies.createUser(userData);
        if (!create_user) {
            return error(res, "User not created", 500);
        }
        return success(res, "User created successfully", 201);
    } catch (error) {
        console.log(error)
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return error(res, "Email and Password are required", 400);
        }
        const user = await authservies.userDetail(email);

        if (!user) {
            return error(res, "Email is not registered", 404);
        }
        if (user.status !== "active") {
            return error(res, "Account is inactive", 403);
        }
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return error(res, "Password not match", 401);
        }
        const token = generateToken({
            userId: user._id,
            email: user.email
        });
        return success(res, { token }, "Login successful", 200);

    } catch (err) {
        console.log("Login Error:", err.message);
        return error(res, "Something went wrong", 500);
    }
};

export const createCustomer = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, userId, name } = req.body
        const customerExits = await authservies.customer_exits(email, userId)
        if (customerExits.status == false) {
            return error(res, customerExits.message, 500);
        }
        const customerCreate = await authservies.createCustomer(email, userId, name);
        if (!customerCreate) {
            return error(res, "user not register", 500)
        }
        return success(res, "Customer Created Successful", 200);
    } catch (error) {
        console.log(error)
    }
}
export const getCustomer = async (req, res) => {
    try {
        const { userId } = req.body;
        const get_customer = await authservies.customer_get(userId);
        if (!get_customer) {
            return error(res, "No any customer", 500)
        }
        return success(res, get_customer, "user Detail", 200);

    } catch (err) {
        console.log(err.message)
    }
}




