import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { IServer } from "../interfaces/IServer";
import AuthRouter from "../routes/auth.route";
import BaseRouter from "../routes/base.route";
import { UserRoutes } from "../routes/user.routes";
import { BaseRoute } from "./Route";
import mongo from "../database/mongo";
dotenv.config();
class AppServer implements IServer {
  app: Express;
  routes: Array<BaseRoute> = [];

  private static instance: AppServer;

  private constructor() {
    this.app = express();
    this.config();
  }

  public static getAppInstance(): AppServer {
    if (!AppServer.instance) {
      AppServer.instance = new AppServer();
    }

    return AppServer.instance;
  }

  config(): void {
    this.app.set("port", process.env.APPLICATION_PUBLISH_PORT);
    this.app.set("host", process.env.APPLICATION_HOST);
    this.app.use("/", new BaseRouter().router);
    this.app.use("/api/auth", new AuthRouter().router);
    this.routes.push(new UserRoutes(this.app));

    /**
     * @health checker routes.
     */
    this.app.get("/hello", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });
    this.app.get("/health", (req: Request, res: Response) => {
      res.send("health checking...");
    });
  }
  server(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.app.listen(this.app.get("port"), this.app.get("host"), () => {
        console.log(
          `🟢⚡️[server]: Server is running at http://${this.app.get(
            "host"
          )}:${this.app.get("port")}`
        );
        resolve();
      });
    });
  }

  async start() {
    // server start...
    await this.server();
    await mongo.connect();
    return {
      express: this.app,
    };
  }
}

export default AppServer;
