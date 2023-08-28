import { Application } from "express";
import { BaseRoute } from "../core/Route";
import userController from "../controller/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";
export class UserRoutes extends BaseRoute{
    constructor(app:Application){
        super(app, "UserRoutes")
    }

    configureRoutes(): Application {
        this.app.route(`/users`).get([userController.getUsers])
        this.app.route("/api/register").post([validateRequest(createUserSchema),userController.createUserHandler]);
        return this.app;
    }
}


