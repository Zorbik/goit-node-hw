import express from "express";
import logger from "morgan";
import cors from "cors";

import { contactsRouter } from "./routes/api/contactsRoutes.js";
import { usersRouter } from "./routes/api/authRoutes.js";

import { errorHandler } from "./helpers/apiHelpers.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  res.status(404).json({ message: err.message });
});

app.use(errorHandler);

export default app;
