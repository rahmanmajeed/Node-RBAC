import { Application } from "express";
import { BaseRoute } from "../core/Route";
import userController from "../controller/user.controller";

export class UserRoutes extends BaseRoute{
    constructor(app:Application){
        super(app, "UserRoutes")
    }

    configureRoutes(): Application {
        this.app.route(`/users`).get([userController.getUsers])
        return this.app;
    }
}


