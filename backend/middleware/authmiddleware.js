import { error } from "../helpers/response.helper.js";
import { validateToken } from "../helpers/jwt.helper.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = validateToken(token);

        if (!decoded) {
            return error(res, "Invalid or expired token", 401);
        }
        req.body = {
            ...req.body,
            userId: decoded.userId
        };

        next();

    } catch (err) {
        console.log(err.message)
        return error(res, "Authentication failed", 500);
    }
};