import express, { Express, Request, Response } from "express";
import { IServer } from "../interfaces/IServer";

class Server implements IServer {
  app: Express = express();
  constructor() {}

  appServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.app.listen(8080, "localhost", () => {
        console.log(`⚡️[server]: Server is running at ${"localhost"}:${8080}`);
        resolve();
      });
    });
  }

  async start() {
    this.app.get("/hello", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });
    // server start...
    await this.appServer();
    return {
      express: this.app,
    };
  }
}

export default Server;
