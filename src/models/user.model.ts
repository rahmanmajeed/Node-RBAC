// // import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
// import bcrypt from "bcryptjs";
// // import { Role } from "./role.model";
// import mongoose from "mongoose";

// export interface UserDocument extends mongoose.Document {
//   name: string;
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//     // role: [
//     //   {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: "Role",
//     //   },
//     // ],
//   },
//   { timestamps: true }
// );

// UserSchema.pre("save", async function (next) {
//   let user = this as UserDocument;
//   //only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   const hash = await bcrypt.hashSync(user.password, 12)
//   user.password = hash
//   return next();

// });

// //Used for logging in
// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ) {
//   const user = this as UserDocument;

//   return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
// };

// const User = mongoose.model<UserDocument>("User", UserSchema);

// // @index({ email: 1 })
// // export class User {
// //   @prop({ type: () => String }) // explicitly define the "PropType"
// //   public name: string;

// //   @prop({ required: true, unique: true })
// //   public email: string;

// //   @prop({ required: true, minlength: 8, maxLength: 32, select: false })
// //   public password: string;

// //   //  @prop({ref:'Role'})
// //   @prop({ ref: () => Role })
// //   public roles?: Ref<Role>[];

// //   // Instance method to check if passwords match
// //   async comparePasswords(hashedPassword: string, candidatePassword: string) {
// //     return await bcrypt.compare(candidatePassword, hashedPassword);
// //   }
// // }

// // const UserModel = getModelForClass(User);
// export default User;



import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

@index({ email: 1 })
@pre<User>("save", async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class User extends Document {
  @prop({required: true })
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  password: string;

  @prop({default:true})
  isTwoFA: boolean;

  @prop()
  secretKey: string;

  @prop({ default: "user" })
  role: string;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
