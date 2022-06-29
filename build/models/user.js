"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    passWord: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    phoneNumber: { type: String },
    address: { type: String },
    salt: { type: String, required: true },
    verified: { type: Boolean, default: false },
    accessToken: { type: String, required: true },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
