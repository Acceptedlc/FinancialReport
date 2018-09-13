import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class CompanyDao {
  @PrimaryColumn("int")
  id: number;

  @Column("varchar", { length: 200 })
  name: string;
}