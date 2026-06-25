import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class WalletEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid")
  clientId!: string;

  @Column()
  walletType!: string;

  @Column("int")
  currency!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  walletLimit!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
