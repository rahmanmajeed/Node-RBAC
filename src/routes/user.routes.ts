import { Application } from "express";
import userController from "../controller/user.controller";
import { BaseRoute } from "../core/Route";
import tokenAuthorization from "../middleware/tokenAuthorize";
import { requireUser } from "../middleware/requireUser";
export class UserRoutes extends BaseRoute {
  constructor(app: Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): Application {
    this.app.route(`/users`).get([tokenAuthorization, requireUser, userController.getUsers]);

    return this.app;
  }
}
