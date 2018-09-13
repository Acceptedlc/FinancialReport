

import {entities} from "./entity/";
import {createConnection} from "typeorm";


export class DaoHelper {
  static async InitConnection(options: any): Promise<void> {

    options.entities = options.entities || entities;
    options.name = options.name || "defaultCon";

    await createConnection(options);
  }
}