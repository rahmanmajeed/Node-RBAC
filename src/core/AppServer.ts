import * as dotenv from "dotenv";
import express, { Express } from "express";
import { IServer } from "../interfaces/IServer";
import BaseRouter from "../routes/base.route";
import AuthRouter from "../routes/auth.route";
dotenv.config();
class AppServer implements IServer {
  app: Express;

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
    return {
      express: this.app,
    };
  }
}

export default AppServer;
