import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
