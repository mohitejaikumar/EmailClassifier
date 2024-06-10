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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPTManager = void 0;
const openai_1 = __importDefault(require("openai"));
const constants_1 = require("./constants");
class GPTManager {
    constructor(key) {
        this.openAI_APIKey = key;
        this.openai = new openai_1.default({
            apiKey: this.openAI_APIKey,
        });
    }
    static getInstance(key) {
        if (!this.instance) {
            this.instance = new GPTManager(key);
        }
        return this.instance;
    }
    classifyEmail(emailMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let prompt = constants_1.CLASSIFY_EMAIL_PROMPT;
            prompt += `  Email: ${emailMessage}   Category: `;
            let answer = "";
            try {
                const completion = yield this.openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                });
                answer = ((_a = completion.choices) === null || _a === void 0 ? void 0 : _a[0].message.content) || "";
                console.log(answer);
            }
            catch (error) {
                console.error("Error classifying email:", error);
            }
            return answer;
        });
    }
}
exports.GPTManager = GPTManager;
