import express from "express";
import { google } from "../controllers/login";

const authRouter = express.Router();

authRouter.post("/google", google);

export default authRouter;
