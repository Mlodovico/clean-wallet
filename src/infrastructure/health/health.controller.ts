import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,
  ) {}

  @Get("live")
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get("ready")
  @HealthCheck()
  ready(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.database.pingCheck("database", { timeout: 3000 }),
    ]);
  }
}
