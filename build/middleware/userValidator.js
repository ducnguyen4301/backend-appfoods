"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.userValidator = [
    (0, express_validator_1.check)("email").normalizeEmail().isEmail().withMessage("email is invalid !"),
    (0, express_validator_1.check)("passWord").trim().not().isEmpty().withMessage("password is missing !"),
];
exports.validate = (req, res, next) => {
    const err = (0, express_validator_1.validationResult)(req).array();
    if (!err.length) {
        return next();
    }
    res.status(400).json({ error: err[0].msg });
};
