import mongoose from "mongoose";

export interface RoleDocument extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Role = mongoose.model<RoleDocument>("Role", RoleSchema);

export default Role;
// categories: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Category' }]
