import { Request, Response } from "express";
import { google } from "googleapis";
import { GPTManager } from "../managers/GPTManager";

export const getEmail = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const authParams = {
      type: "authorized_user",
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
    };
    const auth = google.auth.fromJSON(authParams);
    //@ts-ignore
    const gmail = google.gmail({ version: "v1", auth });

    const gmailRes = await gmail.users.messages.list({
      userId: "me",
    });
    const messages = gmailRes.data.messages;

    for (let i = 0; i < 8; i++) {
      const messageRes = await gmail.users.messages.get({
        userId: "me",
        id: messages?.[i].id || "",
        format: "full",
      });
      const body = Buffer.from(
        JSON.stringify(messageRes.data.payload?.body?.data || ""),
        "base64"
      ).toString();

      GPTManager.getInstance(process.env.OPENAI_API_KEY || "").classifyEmail(
        body
      );

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 8000);
      });
    }
    res.status(200).json({ response: "Emails fetched" });
  } catch (error) {
    console.error("Error in getEmail controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
