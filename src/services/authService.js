import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import sgMail from "@sendgrid/mail";
import { User } from "../models/userModel.js";
import {
  NotAuthorizeError,
  NotFoundError,
  RegistrationConflictError,
} from "../helpers/errors.js";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email, verificationToken) {
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href="${process.env.HOSTING}api/users/verify/${verificationToken}">Confirm</>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function registrateUser(email, password) {
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new RegistrationConflictError("Email in use");
  }
  const user = new User({ email, password });
  user.avatarURL = gravatar.url(email, { s: 200, d: "monsterid" });
  user.verificationToken = uuidv4();

  sendEmail(email, user.verificationToken);

  await user.save();

  return { email, subscription: "starter" };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email, verify: true }, { __v: 0 });

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

export async function avatarChanger(user, file, extension) {
  if (!user) {
    throw new NotAuthorizeError("Not authorized");
  }

  const filePath = `./public/avatars/${uuidv4()}.${extension}`;

  Jimp.read(file)
    .then((file) => {
      return file.resize(250, 250).write(path.resolve(filePath));
    })
    .catch((err) => {
      console.error(err);
    });

  user.avatarURL = filePath;

  await user.save();
}

export async function verifyEmail(verificationToken) {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFoundError("Not found");
  }

  user.verificationToken = "Verification successful";
  user.verify = true;

  await user.save();
}

export async function repeatVerify(email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Not found");
  }

  if (user.verify) return true;

  user.verificationToken = uuidv4();

  sendEmail(email, user.verificationToken);

  await user.save();
}
