import { DataSource } from "typeorm";
import { UnitOfWorkPort } from "../../application/port/unit-of-work.port";
export declare class TypeOrmUnitOfWork implements UnitOfWorkPort {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    run<T>(work: () => Promise<T>): Promise<T>;
}
