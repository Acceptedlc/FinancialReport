import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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