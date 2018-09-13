import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BalanceSheetDao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  year: number;

  @Column("int")
  quarter: number;

  @Column("double")
  moneyFunds: number;//货币资金

  @Column("double")
  transactionalFinancialAssets: number;//交易性金融资产

  @Column("double")
  billReceivable: number;//应收票据

  @Column("double")
  accountsReceivable: number;//应收账款

  @Column("double")
  Prepayments: number;// 预付款项

  @Column("double")
  premiumReceivable: number;// 应收保费

  @Column("double")
  interestReceivable: number;// 应收利息

  @Column("double")
  dividendReceivable: number;// 应收股利

  @Column("double")
  otherReceivables: number;// 其他应收款

  @Column("double")
  exportTaxRebate: number;// 应收出口退税

  @Column("double")
  allowanceReceivable: number;// 应收补贴款

  @Column("double")
  receivableDeposit: number;// 应收保证金

  @Column("double")
  internalReceivables: number;// 内部应收款

  @Column("double")
  stock: number;// 存货

  @Column("double")
  prepaidExpenses: number;// 待摊费用

  @Column("double")
  pendingLiquidAssetsProfitAndLoss: number;// 待处理流动资产损益

  @Column("double")
  NonCurrentAssetsDueWithinOneYear: number;// 一年内到期的非流动资产

  @Column("double")
  otherCurrentAssets: number;// 其他流动资产

  @Column("double")
  specialTreatmentOfItsOwnUnevenCurrentAssets: number;// 特殊处理本身不平流动资产

  @Column("double")
  specialProcessingFormatForDifferentLiquidAssets: number;// 特殊处理格式不同流动资产

  @Column("double")
  totalCurrentAssets: number;// 流动资产合计

  @Column("double")
  loansAndAdvances: number;// 发放贷款及垫款

  @Column("double")
  availableForSaleFinancialAssets: number;// 可供出售金融资产

  @Column("double")
  heldToMaturityInvestments: number;// 持有至到期投资

  @Column("double")
  longTermReceivables: number;// 长期应收款

  @Column("double")
  longTermEquityInvestment: number;// 长期股权投资

  @Column("double")
  otherLongTermInvestments: number;// 其他长期投资

  @Column("double")
  investmentRealEstate: number;// 投资性房地产

  @Column("double")
  originalValueOfFixedAssets: number;// 固定资产原值





















}