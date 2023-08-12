import express, { Request, Response, Router } from "express";
import { IRouter } from "../interfaces/IRouter";
import { loginHandler, verifyUser } from "../controller/auth.controller";
export default class AuthRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.post("/login", loginHandler);
    this.router.get("/verify/:token", verifyUser);

  }
}
