"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getEmail_1 = require("../controllers/getEmail");
const emailRouter = express_1.default.Router();
emailRouter.post("/getEmail", getEmail_1.getEmail);
exports.default = emailRouter;
