import expess from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentuserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-middleware";
import { NotFoundError } from "./error/not-found-error";

const app = expess();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentuserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on Port 3000!!!");
  });
};
start();
