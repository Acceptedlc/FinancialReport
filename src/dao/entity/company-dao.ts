import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class CompanyDao {
  @PrimaryColumn("varchar", { length: 30 })
  id: string;

  @Column("varchar", { length: 200 })
  name: string;
}
