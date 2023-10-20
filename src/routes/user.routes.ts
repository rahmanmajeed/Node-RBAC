import { Application } from "express";
import userController from "../controller/user.controller";
import { BaseRoute } from "../core/Route";
import { requireUser } from "../middleware/requireUser";
import tokenAuthorization from "../middleware/tokenAuthorize";
export class UserRoutes extends BaseRoute {
  constructor(app: Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route(`/users`)
      .get([tokenAuthorization, requireUser, userController.getUsers]);

    return this.app;
  }
}
