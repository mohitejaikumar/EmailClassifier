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
exports.getEmail = void 0;
const googleapis_1 = require("googleapis");
const GPTManager_1 = require("../managers/GPTManager");
const getEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { refreshToken, numberOfMessages, openAPIKey } = req.body;
        if (!openAPIKey) {
            return res.status(404).json({ message: "Provide OpenAPIkey" });
        }
        const authParams = {
            type: "authorized_user",
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
        };
        const auth = googleapis_1.google.auth.fromJSON(authParams);
        //@ts-ignore
        const gmail = googleapis_1.google.gmail({ version: "v1", auth });
        // extract specified number of messages from gmail
        const gmailRes = yield gmail.users.messages.list({
            userId: "me",
            maxResults: numberOfMessages,
        });
        const messages = gmailRes.data.messages;
        const responseMessages = [];
        // @ts-ignore
        for (let i = 0; i < messages.length; i++) {
            const messageRes = yield gmail.users.messages.get({
                userId: "me",
                id: (messages === null || messages === void 0 ? void 0 : messages[i].id) || "",
                format: "full",
            });
            // body of Email Message
            const body = Buffer.from(JSON.stringify(((_b = (_a = messageRes.data.payload) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.data) || ""), "base64").toString();
            // email "FROM " header
            const header = JSON.stringify((_d = (_c = messageRes.data.payload) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d.filter((it) => it.name === "From")[0].value);
            const reducedMessage = body.substring(0, Math.min(body.length - 1, 1000));
            reducedMessage.concat(header);
            console.log(reducedMessage, header);
            GPTManager_1.GPTManager.getInstance(openAPIKey)
                .classifyEmail(reducedMessage)
                .then((answer) => {
                responseMessages.push({
                    message: body,
                    header: header,
                    category: answer,
                });
            });
            yield new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }
        res.status(200).json({ messages: responseMessages });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEmail = getEmail;
