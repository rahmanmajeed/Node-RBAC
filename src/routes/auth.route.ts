import express, { Router } from "express";
import {
  createUserHandler,
  getUserSessionsHandler,
  logOutHandler,
  loginHandler,
  verifyUser,
} from "../controller/auth.controller";
import { IRouter } from "../interfaces/IRouter";
import { requireUser } from "../middleware/requireUser";
import tokenAuthorization from "../middleware/tokenAuthorize";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";
export default class AuthRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router
      .route("/register")
      .post([validateRequest(createUserSchema), createUserHandler]);
    this.router.post("/login", validateRequest(loginUserSchema), loginHandler);
    this.router.get(
      "/session",
      tokenAuthorization,
      requireUser,
      getUserSessionsHandler
    );
    this.router.delete(
      "/logout",
      tokenAuthorization,
      requireUser,
      logOutHandler
    );
    this.router.get("/verify/:token", verifyUser);
  }
}
