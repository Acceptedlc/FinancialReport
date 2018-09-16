import {CashFlowStatementDao, CashFlowStatementDaoHelper} from "../dao/entity";
import {StatisticsUtis} from "../utils";

export class FreeCashFlowService {
  static async caculate(corporationId: string, quarter: number, startYear: number, endYear: number): Promise<FreeCashFlow[]> {
    let result: FreeCashFlow[] = [];
    let cashFlowStatementDaos: CashFlowStatementDao[] = await CashFlowStatementDaoHelper.Query4FreeCashFlowService(corporationId, quarter, startYear, endYear);
    for (let i = 0; i < cashFlowStatementDaos.length - 1; i++) {
      let thisYearFreeCash: number = cashFlowStatementDaos[i].businessActivityCashFlowNetWorth - cashFlowStatementDaos[i].investingActivityCashOutflow;
      let lastYearFreeCash: number = cashFlowStatementDaos[i - 1].businessActivityCashFlowNetWorth - cashFlowStatementDaos[i - 1].investingActivityCashOutflow;
      let temp: FreeCashFlow = {
        value: thisYearFreeCash,
        rate: StatisticsUtis.growthRate(thisYearFreeCash, lastYearFreeCash)
      };
      result.push(temp);
    }
    return result;
  }

}

export interface FreeCashFlow {
  value: number,
  rate: number
}