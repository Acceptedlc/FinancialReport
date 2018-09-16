import {CashFlowStatementDaoHelper, DaoHelper} from "../dao";

const csvdata = require("csvdata");
import {getConfigByArgv} from "../utils";
import * as _ from "lodash";

const defaultConf: any = {
  db: {
    path: "/Users/lichao/financial_report.sqlite"
  },
  csvFilePath: "/tmp/temp.vsc",
  corporationId: "股票编号"
};

let config: any = getConfigByArgv(defaultConf);


async function run() {
  await DaoHelper.InitConnection({
    type: "sqlite",
    database: config.db.path
  });


  let cashFlows: any = await csvdata.load(config.csvFilePath);

  for (let cashFlow of cashFlows) {
    let data: any = csvDataExtract(cashFlow);
    await CashFlowStatementDaoHelper.InsertByDeadline(data, data.deadline);
  }
}

run().then(() => console.log("finish")).catch(e => console.log(e.stack));


function csvDataExtract(data: any): any {
  let deadline: string;
  for (let key of deadlineKeys) {
    if (_.isNumber(data[key])) {
      deadline = data[key] + "";
      break;
    }
  }

  let businessActivityCashFlowNetWorth: number = 0;
  for (let key of businessActivityCashFlowNetWorthKeys) {
    if (_.isNumber(data[key])) {
      businessActivityCashFlowNetWorth = data[key];
      break;
    }
  }

  let investingActivityCashOutflow: number = 0;
  for (let key of investingActivityCashOutflowKeys) {
    if (_.isNumber(data[key])) {
      investingActivityCashOutflow = data[key];
      break;
    }
  }

  return {
    businessActivityCashFlowNetWorth,
    investingActivityCashOutflow,
    deadline,
    corporationId: config.corporationId
  };
}

const deadlineKeys: string[] = ["报表期截止日"];
const businessActivityCashFlowNetWorthKeys: string[] = ["一、经营活动产生的现金流量净"];
const investingActivityCashOutflowKeys: string[] = ["投资活动现金流出小计"];





