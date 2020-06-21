import {Request, Response, NextFunction} from "express";

import logger from "../util/logger";
import errorResponseMessage from "../util/response-parser";
import {IUser} from "../interfaces/models";

import {findOne, create} from "../lib/database";

async function createUser(request: Request, response: Response, next: NextFunction): Promise<any> {
  try {
    const user = request.body as IUser;

    if (!Object.keys(user).length) {
      const responseMessage = errorResponseMessage("", 204);
      return response.status(204).send(responseMessage);
    }

    logger.debug("params to create user: ", user);

    const userEmailExist = await findOne("User", "email", user.email);

    if (userEmailExist) {
      const responseMessage = errorResponseMessage(`email ${user.email} already exists!`, 409);
      return response.status(409).send(responseMessage);
    }

    const users = await create("User", user);
    return response.status(201).send(users);
  } catch (err) {
    next(err.message);
  }
}

export {createUser};
