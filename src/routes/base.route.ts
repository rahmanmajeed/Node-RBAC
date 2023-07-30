import express, { Request, Response, Router } from "express";
import { IRouter } from "../interfaces/IRouter";
export default class BaseRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get("/hello", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });
    this.router.get("health", (req: Request, res: Response) => {
      res.send("health checking...");
    });
  }
}
