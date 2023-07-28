import express, { Request, Response } from "express";
import 'dotenv/config'
import Server from "./src/core/Server";

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
// const app = express();
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

// app.get("/health", (req: Request, res: Response) => {
//   res.send("Heath check...");
// });

// app.listen(PORT, HOST, () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
// });

(async function(){
  try {
    let server = new Server();
    await server.start()
  } catch (error) {
    
  }
})()
