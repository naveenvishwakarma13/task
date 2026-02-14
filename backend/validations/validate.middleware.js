import { error } from "../helpers/response.helper.js";

export const validate = (schema) => {
    return (req, res, next) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return error(res, "Request body is required", 400);
        }

        const errors = [];

        for (const field of schema.required || []) {
            const value = req.body[field];

            if (value === undefined || value === null) {
                errors.push(`${field} is required`);
                continue;
            }

            if (value === "") {
                errors.push(`${field} should not be empty`);
            }

            // Integer check
            if (schema.integers?.includes(field)) {
                if (!Number.isInteger(value)) {
                    errors.push(`${field} must be an integer`);
                }
            }

            // Minimum digits check
            if (schema.minDigits?.[field]) {
                if (value.toString().length !== schema.minDigits[field]) {
                    errors.push(`${field} must be ${schema.minDigits[field]} digits`);
                }
            }

            // Pattern (regex) check
            if (schema.pattern?.[field]) {
                const regex = schema.pattern[field];
                if (!regex.test(value)) {
                    errors.push(`${field} format is invalid`);
                }
            }

            // Empty array check
            if (Array.isArray(value) && value.length === 0) {
                errors.push(`${field} should not be empty`);
            }

            // Empty object check
            if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
                errors.push(`${field} should not be empty`);
            }
        }

        if (errors.length > 0) {
            return error(res, "Validation failed", 400, errors);
        }

        next();
    };
};