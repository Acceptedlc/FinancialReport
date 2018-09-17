import {Column, Entity, getRepository, getConnection, PrimaryGeneratedColumn, Between} from "typeorm";

const moment = require("moment");

@Entity()
export class CashFlowStatementDao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  year: number;

  @Column("int")
  quarter: number;

  @Column("varchar", {length: 30})
  corporationId: string;

  @Column("double")//经营性活动现金净流入
  businessActivityCashFlowNetWorth: number;

  @Column("double")//投资活动现金流出
  investingActivityCashOutflow: number;

}


export class CashFlowStatementDaoHelper {

  static async InsertByDeadline(data: any, deadline: string) {
    let quarter: number = moment(deadline, "YYYYMM").quarter();
    let year: number = moment(deadline, "YYYYMM").year();
    data = Object.assign({}, data, {year, quarter});
    await CashFlowStatementDaoHelper.Insert(data);
  }

  private static async Insert(data: any): Promise<void> {
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
    cashFlow.corporationId = data.corporationId;
    await getConnection().getRepository(CashFlowStatementDao).save(cashFlow);
  }


  static async Query4FreeCashFlowService(corporationId: string, quarter: number, startYear: number, endYear: number): Promise<CashFlowStatementDao[]> {
    return await getConnection()
      .getRepository(CashFlowStatementDao)
      .createQueryBuilder("cashFlowStatement")
      .where(`
         corporationId = '${corporationId}'
          and 
         quarter = ${quarter}
          and
         year >= ${startYear}
          and 
         year <= ${endYear} 
      `)
      .getMany();
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
    corporationId: {type: "string"},
    year: {type: "number"},
    quarter: {type: "number"}

  }
}, "insertData");

