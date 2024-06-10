"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const emailRouter_1 = __importDefault(require("./routes/emailRouter"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRouter_1.default);
app.use("/email", emailRouter_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
});
