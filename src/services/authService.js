import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import { User } from "../models/userModel.js";
import {
  NotAuthorizeError,
  RegistrationConflictError,
} from "../helpers/errors.js";

dotenv.config();

export async function registrateUser(email, password) {
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new RegistrationConflictError("Email in use");
  }
  const user = new User({ email, password });
  user.avatarURL = gravatar.url(email, { s: 200, d: "monsterid" });
  await user.save();
  return { email, subscription: "starter" };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email }, { __v: 0 });

  if (!user) {
    throw new NotAuthorizeError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizeError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await user.save();
  const respUser = { email: user.email, subscription: user.subscription };

  return { token, respUser };
}

export async function logoutUser(user) {
  user.token = null;
  await user.save();
}

export async function subscriptionUser(email, newSubscription) {
  const user = await User.findOneAndUpdate(
    { email },
    { ...newSubscription },
    { new: true }
  );

  return user;
}
