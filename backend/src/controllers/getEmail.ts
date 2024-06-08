import { Request, Response } from "express";
import { google } from "googleapis";
import { GPTManager } from "../managers/GPTManager";

interface ResponseMessages {
  message: string;
  header: string;
  category: string;
}

export const getEmail = async (req: Request, res: Response) => {
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
    const auth = google.auth.fromJSON(authParams);
    //@ts-ignore
    const gmail = google.gmail({ version: "v1", auth });
    // extract specified number of messages from gmail
    const gmailRes = await gmail.users.messages.list({
      userId: "me",
      maxResults: numberOfMessages,
    });
    const messages = gmailRes.data.messages;
    const responseMessages: ResponseMessages[] = [];

    // @ts-ignore
    for (let i = 0; i < messages.length; i++) {
      const messageRes = await gmail.users.messages.get({
        userId: "me",
        id: messages?.[i].id || "",
        format: "full",
      });
      // body of Email Message
      const body = Buffer.from(
        JSON.stringify(messageRes.data.payload?.body?.data || ""),
        "base64"
      ).toString();

      // email "FROM " header
      const header = JSON.stringify(
        messageRes.data.payload?.headers?.filter((it) => it.name === "From")[0]
          .value
      );

      const reducedMessage = body.substring(0, Math.min(body.length - 1, 1000));
      reducedMessage.concat(header);
      console.log(reducedMessage, header);

      GPTManager.getInstance(openAPIKey)
        .classifyEmail(reducedMessage)
        .then((answer) => {
          responseMessages.push({
            message: body,
            header: header,
            category: answer,
          });
        });

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }

    res.status(200).json({ messages: responseMessages });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
