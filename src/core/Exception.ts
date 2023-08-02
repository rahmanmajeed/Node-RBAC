import { HttpStatusCode } from "../Enums/HttpStatusCode";

class Exception extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    //  Object.setPrototypeOf(obj, [new prototype of (obj)])
    Object.setPrototypeOf(this, new.target.prototype); //whether a function or constructor was called using the new operator

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
  static handle() {
    console.log("handle called...");
  }
}

export default Exception;
