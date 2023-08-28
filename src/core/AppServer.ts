import * as dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import mongo from "../database/mongo";
import { IServer } from "../interfaces/IServer";
import AuthRouter from "../routes/auth.route";
import BaseRouter from "../routes/base.route";
import { UserRoutes } from "../routes/user.routes";
import Exception from "./Exception";
import { BaseRoute } from "./Route";
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
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ extended: false }));
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

    /**
     * Generic error route health check
     */
    this.app.get(
      "/error",
      (req: Request, res: Response, next: NextFunction) => {
        next(new Exception("health-error", 200, "Test Error health !!!", true));
        // or
        // next(new ErrorException(ErrorCode.Unauthenticated))
      }
    );

    // UnKnown Routes
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      const err = new Error(`Route ${req.originalUrl} not found`) as any;
      err.statusCode = 404;
      next(err);
    });
    // Global Error Handler
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        err.status = err.status || "error";
        err.statusCode = err.statusCode || 500;

        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
      }
    );
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
