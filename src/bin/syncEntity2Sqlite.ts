import {getConfigByArgv} from "../utils";

const Dao = require("../dao");



const defaultConf: any = {
  db: {
    path: "/Users/lichao/financial_report.sqlite"
  },
  syncEntity: "null"// 默认不同步 | all 同步所有的 | 具体的Entity类名
};

let config: any = getConfigByArgv(defaultConf);

async function run() {
  if(config.syncEntity === "all") {
    await Dao.DaoHelper.InitConnection({
      type: "sqlite",
      database: config.db.path,
      synchronize: true
    });
  } else if(config.syncEntity === "null") {
    return;
  } else {
    await Dao.DaoHelper.InitConnection({
      type: "sqlite",
      database: config.db.path,
      entities: [Dao[config.syncEntity]],
      synchronize: true
    });
  }

}

run().then(() => console.log("finish")).catch(e => console.error(e))
