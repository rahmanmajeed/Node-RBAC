import { authOptions } from "../types/TAuth";

export interface IAuth {
  options: authOptions;
  signAuthToken: (payload: Object, options?: Object) => string;
  verifyAuthToken: <T>(token: string) => T | null;
}
