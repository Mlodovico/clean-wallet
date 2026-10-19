import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { UnitOfWorkPort } from "../../application/port/unit-of-work.port";
import { transactionContext } from "./transaction-context";

@Injectable()
export class TypeOrmUnitOfWork implements UnitOfWorkPort {
  constructor(private readonly dataSource: DataSource) {}

  run<T>(work: () => Promise<T>): Promise<T> {
    if (transactionContext.getStore()) {
      return work();
    }

    return this.dataSource.transaction((manager) =>
      transactionContext.run(manager, work),
    );
  }
}
