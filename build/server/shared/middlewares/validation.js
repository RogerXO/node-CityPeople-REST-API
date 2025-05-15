"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validation = (schemas) => async (req, res, next) => {
    const errorsResults = {};
    Object.entries(schemas).forEach(([key, schema]) => {
        // const key = item[0];
        // const schema = item[1];
        try {
            schema.validateSync(req[key], { abortEarly: false });
        }
        catch (err) {
            const yupError = err;
            const errors = {};
            yupError.inner.forEach((error) => {
                if (!error.path)
                    return;
                errors[error.path] = error.message;
            });
            errorsResults[key] = errors;
        }
    });
    if (Object.entries(errorsResults).length === 0) {
        return next();
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: errorsResults,
        });
    }
};
exports.validation = validation;
