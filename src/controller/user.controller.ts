import { NextFunction, Response } from "express";
class UserController {
  constructor() {}

  async getUsers(req: any, res: Response, next: NextFunction) {
    try {
      // read the "name" query parameter
      // let name = req.query.name;
      res.json(`Hello, ${"majeed"}!`);
    } catch (e) {
      // catch any error and send it
      // to the error handling middleware
      return next(e);
    }
  }
}

export default new UserController();
