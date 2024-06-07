import express from "express";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";
import emailRouter from "./routes/emailRouter";
dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/email", emailRouter);
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
