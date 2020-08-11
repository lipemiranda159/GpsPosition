import jwt from "jsonwebtoken";
import dotenv from "dotenv-safe";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const HEADER_ACCESS_TOKEN = "x-access-token";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers[HEADER_ACCESS_TOKEN] as string;
  if (!token) {
    return res.send(401).json({ auth: false, message: "No token provided." });
  } else {
    jwt.verify(token, process.env.SECRET || "secret", function (
      err: any,
      decoded: any
    ) {
      if (err) {
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });
      }
      req.params.userId = decoded.id;
      next();
    });
  }
};

export default authMiddleware;
