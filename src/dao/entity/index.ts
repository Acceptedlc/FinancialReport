import {CompanyDao} from "./company-dao";
import {BalanceSheetDao} from "./balance-sheet-dao";

const entities: any[] = [
  CompanyDao,
  BalanceSheetDao
];

export {
  entities,
  CompanyDao,
  BalanceSheetDao
};