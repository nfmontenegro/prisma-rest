import {Response, NextFunction} from "express";

import {logger} from "../libs";
import {create} from "../dao/post";
import {IRequest} from "../interfaces";

async function createPost(request: IRequest, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const post = await create({...request.body, userId: request.user.uuid});
    return response.status(201).send({result: post});
  } catch (err) {
    logger.info(err);
    return next(err);
  }
}

export {createPost};
