import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, image } = req.body;
    const token = jwt.sign(
      {
        name: name,
        email: email,
        image: image,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "6h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in google controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
