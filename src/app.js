import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//common middleware
app.use(express.json({ limit: "16kb" })); //if data comes from forms or something
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //if data comes from urls
app.use(express.static("public")); // to keep static files like images, videos, etc. in the public folder
app.use(cookieParser()); // to parse cookies from the request

//import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";

//routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
export { app };
