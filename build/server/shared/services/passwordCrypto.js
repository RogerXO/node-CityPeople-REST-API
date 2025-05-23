"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = require("bcryptjs");
const SALT_RANDOMS = 8;
async function hashPassword(password) {
    const salt = await (0, bcryptjs_1.genSalt)(SALT_RANDOMS);
    return await (0, bcryptjs_1.hash)(password, salt);
}
async function verifyPassword(password, hashPassword) {
    return await (0, bcryptjs_1.compare)(password, hashPassword);
}
