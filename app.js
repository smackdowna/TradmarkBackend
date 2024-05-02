import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

const app = express();

//using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

import admin from "./routes/adminRoutes.js";
import pdf from "./routes/pdfRoute.js";
import email from "./routes/send.js";
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", admin);
app.use("/api/v1", pdf);
app.use("/api/v1", email);

export default app;

app.get("/", (req, res) => res.send(`<h1>Trade Mark Software backend</h1>`));

app.use(ErrorMiddleware);
