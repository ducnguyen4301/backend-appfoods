"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.signinUser = exports.signupUser = void 0;
const helpers_1 = require("../utils/helpers");
const user_1 = require("../models/user");
require("dotenv").config();
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passWord, email, avatar, phoneNumber, address, verified } = req.body;
    const salt = yield (0, helpers_1.GenerateSalt)();
    const userPassword = yield (0, helpers_1.GeneratePassword)(passWord, salt);
    const checkEmail = yield user_1.User.findOne({ email });
    if (checkEmail) {
        return res
            .status(400)
            .json({ success: false, error: "Email already exists !" });
    }
    const name = yield (0, helpers_1.GenerateName)();
    const token = yield (0, helpers_1.GenerateAccessToken)({ email: email });
    const newUser = yield user_1.User.create({
        name: name,
        passWord: userPassword,
        email: email,
        avatar,
        phoneNumber: "",
        address: "",
        salt: salt,
        verified: verified,
        accessToken: token,
    });
    if (newUser) {
        return res.status(201).json({
            success: true,
            accessToken: token,
            verified: newUser.verified,
        });
    }
    return res
        .status(400)
        .json({ success: false, error: "ERROR WHEN CREATING USER!" });
});
exports.signupUser = signupUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, passWord } = req.body;
    if (!email.trim() || !passWord.trim()) {
        return res
            .status(400)
            .json({ success: false, error: "email/password is missing !" });
    }
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, error: "User not found !" });
    }
    const validation = yield (0, helpers_1.ValidatePassword)(passWord, user.passWord, user.salt);
    if (!validation) {
        return res
            .status(400)
            .json({ success: false, error: "email/password does not match !" });
    }
    return res.json({
        success: true,
        user: { id: user._id, email: user.email, accessToken: user.accessToken },
    });
});
exports.signinUser = signinUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.body._id;
    if (customer) {
        const profile = yield user_1.User.findById(customer._id);
        if (profile) {
            return res.status(201).json(profile);
        }
    }
    return res.status(400).json({ error: "User not found !" });
});
exports.getUserProfile = getUserProfile;
