import OpenAI from "openai";
import { CLASSIFY_EMAIL_PROMP } from "./constants";

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
    let prompt = CLASSIFY_EMAIL_PROMP;
    prompt += `  Email: ${emailMessage}   Category: `;

    try {
      const response = await this.openai.completions.create({
        model: "text-embedding-ada-002",
        prompt: prompt,
        max_tokens: 10,
        temperature: 0,
      });
      console.log(response.choices[0].text);
    } catch (error) {
      console.error("Error classifying email:", error);
    }
  }
}
