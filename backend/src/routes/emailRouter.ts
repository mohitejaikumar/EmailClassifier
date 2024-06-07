import express from "express";
import { getEmail } from "../controllers/getEmail";

const emailRouter = express.Router();

emailRouter.post("/getEmail", getEmail);

export default emailRouter;
