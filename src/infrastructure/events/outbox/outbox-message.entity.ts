import { Entity, Index, PrimaryColumn, Column } from "typeorm";

@Entity("outbox_messages")
@Index(["publishedAt", "occurredAt"])
export class OutboxMessage {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  type!: string;

  @Column("jsonb")
  payload!: Record<string, unknown>;

  @Column({ type: "timestamptz", nullable: true })
  publishedAt!: Date | null;

  @Column({ type: "timestamptz" })
  occurredAt!: Date;

  @Column({ default: 0 })
  attempts!: number;

  @Column({ type: "text", nullable: true })
  lastError!: string | null;
}