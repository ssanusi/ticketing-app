import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface Usermodel extends mongoose.Model<userDoc> {
  build(attrs: UserAttrs): userDoc;
}

interface userDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userScheme.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userScheme.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, Usermodel>("User", userScheme);

export { User };
