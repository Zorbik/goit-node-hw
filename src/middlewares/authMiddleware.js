import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NotAuthorizeError } from "../helpers/errors.js";
import { User } from "../models/userModel.js";

dotenv.config();

export async function authMiddleware(req, res, next) {
  const [, token] = req.headers.authorization?.split(" ") ?? [];

  if (!token) {
    return next(new NotAuthorizeError("Not authorized"));
  }

  try {
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id }, { __v: 0, password: 0 });
    if (user.token !== token) {
      return next(new NotAuthorizeError("Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizeError("Not authorized"));
  }
}
