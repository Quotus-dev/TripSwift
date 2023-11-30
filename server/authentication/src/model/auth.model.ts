import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { createHash } from "../utils/bcryptHelper";

export interface AuthType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthQueryHelpers {
  byEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<AuthType>[],
    HydratedDocument<AuthType>,
    AuthQueryHelpers
  >;
}

type AuthModelType = Model<AuthType, AuthQueryHelpers>;

const authSchema = new mongoose.Schema<AuthType, {}, {}, AuthQueryHelpers>(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["superadmin", "admin", "user", "property_manager"],
        default: "superadmin",
      },
    },
    {
      timestamps: true,
    }
  );

  authSchema.query.byEmail = function byEmail(
    this: QueryWithHelpers<any, HydratedDocument<AuthType>, AuthQueryHelpers>,
    email: string
  ) {
    return this.find({ email });
  };
  
  authSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await createHash(this.password);
    next();
  });
  
  const Auth = mongoose.model<AuthType, AuthModelType>("User", authSchema);
  
  export default Auth;