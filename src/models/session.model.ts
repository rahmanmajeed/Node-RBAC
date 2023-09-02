import mongoose, { Document, Schema } from "mongoose";
import { User } from "./user.model";

export interface SessionDocument extends Document {
  user: User["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updateAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: String,
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;
