import mongoose from "mongoose";
import { ServiceConnector } from "../core/Connector";
import Env from "../core/Env";

class MongoDB extends ServiceConnector {
  private url = `mongodb://${Env.get("MONGODB_USERNAME")}:${Env.get(
    "MONGODB_PASSWORD"
  )}@localhost:27017/${Env.get("MONGODB_DATABASE_NAME")}?authSource=admin`;
  constructor() {
    super();
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
      // useFindAndModify: false,
    };
    this.retrySeconds = 5;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, this.options);
      console.log("database connected...");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  reConnect() {
    return mongoose.connection.on("disconnected", this.connect);
  }
}

export default new MongoDB();
