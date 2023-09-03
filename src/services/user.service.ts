import { FilterQuery, QueryOptions } from "mongoose";
import userModel, { User } from "../models/user.model";

//CreateUser
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return user.toJSON();
};

//Find one user by any field.

export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};
