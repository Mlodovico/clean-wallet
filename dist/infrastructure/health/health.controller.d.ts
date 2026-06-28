import { HealthCheckService, HealthCheckResult, TypeOrmHealthIndicator } from "@nestjs/terminus";
export declare class HealthController {
    private readonly health;
    private readonly database;
    constructor(health: HealthCheckService, database: TypeOrmHealthIndicator);
    live(): Promise<HealthCheckResult>;
    ready(): Promise<HealthCheckResult>;
}
