import dotenv from "dotenv";
import fs, { readFileSync } from "fs";
import path from "path";
dotenv.config();

const envPath = path.join(__dirname, ".env");
const env: any =
  fs.existsSync(".env") &&
  dotenv.parse(readFileSync(".env", { encoding: "utf8" }));

export default {
  get: function (name: string, defaultValue = null) {
    return env[name] || defaultValue;
  },

  all: function () {
    return env;
  },
};
