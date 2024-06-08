import OpenAI from "openai";
import { CLASSIFY_EMAIL_PROMPT } from "./constants";

export class GPTManager {
  private openAI_APIKey: string;
  private openai: OpenAI;
  public static instance: GPTManager;

  private constructor(key: string) {
    this.openAI_APIKey = key;
    this.openai = new OpenAI({
      apiKey: this.openAI_APIKey,
    });
  }

  public static getInstance(key: string) {
    if (!this.instance) {
      this.instance = new GPTManager(key);
    }
    return this.instance;
  }

  async classifyEmail(emailMessage: string) {
    let prompt = CLASSIFY_EMAIL_PROMPT;
    prompt += `  Email: ${emailMessage}   Category: `;
    let answer = "";
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      answer = completion.choices?.[0].message.content || "";
      console.log(answer);
    } catch (error) {
      console.error("Error classifying email:", error);
    }
    return answer;
  }
}
