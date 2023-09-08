import { NextFunction, Request, Response } from "express";
import Exception from "../core/Exception";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(
        new Exception(
          "RequireUser",
          401,
          `Invalid token or session has expired`,
          false
        )
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
