import {v4 as uuidv4} from "uuid";

import db from "../database/models";
import {IUser} from "../interfaces/models";

async function findOne(field: string, params: string): Promise<IUser> {
  return db.User.findOne({
    where: {
      [field]: params
    }
  });
}

async function create(params: IUser): Promise<IUser> {
  return db.User.create({...params, uuid: uuidv4()});
}

async function getAll(limit: number, offset: number): Promise<any> {
  return db.User.findAll({limit, offset});
}

async function update(query: any, body: IUser): Promise<IUser> {
  return db.User.update(body, query);
}

export {findOne, create, getAll, update};
