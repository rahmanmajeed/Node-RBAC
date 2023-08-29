import { HttpStatusCode } from "../Enums/HttpStatusCode";

class Exception extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly documentationUrl: string;

  constructor(
    name: string | null,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    //  Object.setPrototypeOf(obj, [new prototype of (obj)])
    Object.setPrototypeOf(this, new.target.prototype); //whether a function or constructor was called using the new operator

    this.name = name || "";
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    // attaching a call stack to the current class,
    // preventing the constructor call to appear in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
  static handle() {
    console.log("handle called...");
  }
}

export default Exception;
