import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return token;

    } catch (error) {
        throw new Error("Error generating token");
    }
};

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return error(res, "Token missing", 401);
        }

        const decoded = validateToken(token);

        if (!decoded) {
            return error(res, "Invalid or expired token", 401);
        }

        // 🔥 Attach full decoded payload
        req.user = decoded;

        next();

    } catch (err) {
        return error(res, "Authentication failed", 500);
    }
};
export const validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};