import { NextFunction, Request, Response } from "express";
import { signToken, verifyToken } from "../services/auth.service";

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Get the user from collection
    const user ={
      id: "64ac43b1a1a2f40c4a8ee182",//64ac43b1a1a2f40c4a8ee182
      name: "john",
      email: "johndoe@gmail.com",
      password: 'password',
      role: 'admin'
    };
    
    //create an Access Token
    const { access_token } = await signToken(user);

    //verify token

    
    // Send Access Token
    res.status(200).json({
      status: "success",
      access_token
    });
  } catch (err: any) {
    next(err);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await verifyToken(req.params.token);
  if (!users) {
    return next(new Error(`Invalid token or user doesn't exist`));
  }
   res.send(users)
   next();
}
