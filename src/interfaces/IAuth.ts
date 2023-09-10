import { authOptions } from "../types/TAuth";

export interface IAuth<T>{
    options: authOptions;
    signAuthToken: (payload: Object, options?: Object) => string
    verifyAuthToken:(token: string) => T
}