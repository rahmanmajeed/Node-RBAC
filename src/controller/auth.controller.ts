import { NextFunction, Request, Response } from "express";
import { LoginUserInput } from "../schema/user.schema";
import {
  createRefreshToken,
  createSession,
  findSession,
  signToken,
  updateSession,
  verifyToken,
} from "../services/auth.service";
import { createUser, findUser } from "../services/user.service";

export const createUserHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    return res.send(user);
  } catch (error: any) {
    console.log("error happed in controller");
    if (error.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(error);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    //Get the user from collection
    const user = await findUser({ email: req.body.email });

    //Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new Error("Invalid email or password"));
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    //create an Access Token
    const { access_token } = await signToken({ user, session: session._id });

    //create Refresh Token
    const refreshToken = await createRefreshToken(user, session._id);

    // Send Access Token in Cookie
    // res.cookie("accessToken", access_token, accessTokenCookieOptions);
    // res.cookie("logged_in", true, {
    //   ...accessTokenCookieOptions,
    //   httpOnly: false,
    // });

    // Send Access Token & Refresh Token...
    res.status(200).json({
      status: "success",
      access_token,
      refreshToken,
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
  res.send(users);
  next();
};

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._doc._id;
  console.log(res.locals.user.session)
  const sessions = await findSession({ user: userId, valid: true });

  return res.send(sessions);
}


export const logOutHandler = async (req: Request, res: Response) => {
     const sessionId = res.locals.user.session;
     await updateSession({_id: sessionId}, {valid:false})

     return res.send({
      access_token: null,
      refreshToken: null,
     })
}