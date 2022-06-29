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
const process_1 = require("process");
const mongoose = require("mongoose");
const pass = process_1.env.PASSWORD_MONGODB;
const userName = process_1.env.USERNAME_MONGODB;
const URI = `mongodb+srv://${userName}:${pass}@cluster0.zvplh.mongodb.net/Appfoods`;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
        });
        console.log("Connected Database");
    }
    catch (err) {
        console.log(err.message);
    }
});
