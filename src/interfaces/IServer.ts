import { Express } from "express";
export interface IServer {
  app: Express;

  /**
   * @server up
   */
  server(): Promise<void>;

  /**
   * @config server
   */
  // config<T>(arg:T): T
  config(): void;
}
