import express, { Request, Response, Router } from "express";
import { IRouter } from "../interfaces/IRouter";
export default class BaseRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {

  }
}
