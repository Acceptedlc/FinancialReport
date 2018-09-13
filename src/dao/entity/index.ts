import {CompanyDao} from "./company-dao";
import {BalanceSheetDao} from "./balance-sheet-dao";
import {CashFlowStatementDao} from "./cash-flow-statement-dao";

const entities: any[] = [
  CompanyDao,
  BalanceSheetDao,
  CashFlowStatementDao
];

export {
  entities,
  CompanyDao,
  BalanceSheetDao,
  CashFlowStatementDao
};