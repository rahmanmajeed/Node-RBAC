import "dotenv/config";
import AppServer from "./src/core/AppServer";

(async function () {
  try {
    let server = AppServer.getAppInstance();
    await server.start();
  } catch (error) {}
})();
