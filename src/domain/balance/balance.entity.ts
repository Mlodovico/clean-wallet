import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BalanceEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  overdraftLimit!: number;

  @Column({ length: 3 })
  currency!: string;

  @Column()
  transactionType!: string;

  @Column()
  transactionId!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
