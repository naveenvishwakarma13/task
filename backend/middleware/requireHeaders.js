import { success, error } from '../helpers/response.helper.js';
export const requireHeaders = (requiredHeaders = []) => {
    return (req, res, next) => {

        for (const headerGroup of requiredHeaders) {
            const headers = Array.isArray(headerGroup)
                ? headerGroup
                : [headerGroup];

            let valueFound = null;
            let headerFound = null;

            for (const header of headers) {
                const key = header.toLowerCase();
                const value = req.headers[key];
                if (
                    typeof value === 'string' &&
                    value.trim().length > 0
                ) {
                    valueFound = value.trim();
                    headerFound = header;
                    break;
                }
            }

            if (!valueFound) {
                return error(
                    res,
                    `One of these headers is required and must have a value: ${headers.join(', ')}`,
                    401
                );
            }

            req[headerFound.replace(/-/g, '_')] = valueFound;
        }

        next();
    };
};

