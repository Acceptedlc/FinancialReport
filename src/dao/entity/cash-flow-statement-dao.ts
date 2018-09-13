import {Column, Entity, getRepository, PrimaryGeneratedColumn} from "typeorm";

const moment = require("moment");

@Entity()
export class CashFlowStatementDao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  year: number;

  @Column("int")
  quarter: number;


  @Column("double")//经营性活动现金净流入
  businessActivityCashFlowNetWorth: number;


  @Column("double")//投资活动现金流出
  investingActivityCashOutflow: number;

}


export class CashFlowStatementDaoHelper {

  static async insertByDeadline(data: any, deadline: string) {
    moment(deadline, "YYYYMM")
  }

  static async Insert(data: any): Promise<void> {
    let validate = ajv.getSchema("insertData");
    let valid: boolean = validate(data);
    if (valid === false) {
      throw new Error(`CashFlowStatementDaoHelper Insert data error: ${ajv.errorsText(validate.errors)}`);
    }

    let cashFlow: CashFlowStatementDao = new CashFlowStatementDao();
    cashFlow.businessActivityCashFlowNetWorth = data.businessActivityCashFlowNetWorth;
    cashFlow.investingActivityCashOutflow = data.investingActivityCashOutflow;
    cashFlow.year = data.year;
    cashFlow.quarter = data.quarter;

    await getRepository(CashFlowStatementDao).save(cashFlow);
  }
}


const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addSchema({
  type: "object",
  required: ["businessActivityCashFlowNetWorth", "investingActivityCashOutflow", "year", "quarter"],
  properties: {
    investingActivityCashOutflow: {type: "number"},
    businessActivityCashFlowNetWorth: {type: "number"},
    year: {type: "number"},
    quarter: {type: "number"}

  }
}, "insertData");