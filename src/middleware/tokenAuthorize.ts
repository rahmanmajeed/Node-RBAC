import { NextFunction, Request, Response } from "express";
import jwt from "../auth/jwt";
import Exception from "../core/Exception";
import { reIssueAccessToken } from "../services/auth.service";

const tokenAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //store requested accessToken & refreshToken
  const tokens = { accessToken: "", refreshToken: "" };

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    tokens.accessToken = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.access_token) {
    tokens.accessToken = req.cookies.access_token;
  }

  if (req.headers["x-refresh"]) {
    tokens.refreshToken = req.headers["x-refresh"] as string;
  }

  if (!tokens.accessToken) {
    throw new Exception("TokenError", 401, "Token is expired.", false);
  }

  //if access token available ? verify the token

  const { expired, decoded }: any = jwt.verifyToken(tokens.accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
    // new Exception("token", 401, `Invalid token or user doesn't exist`, false)
  }

  // Check if user has a valid session
  // const session = await redisClient.get(decoded.sub);

  if (expired && tokens.refreshToken) {
    const generateNewAccessToken = await reIssueAccessToken(
      tokens.refreshToken
    ) as string;

    if (generateNewAccessToken) {
      res.setHeader("authorization", generateNewAccessToken);
    }

    const {decoded}: any = jwt.verifyToken(generateNewAccessToken);
    res.locals.user = decoded;

  }
  next();
};

export default tokenAuthorization;
