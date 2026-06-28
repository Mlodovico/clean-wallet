import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: Number(configService.get("POSTGRES_PORT") ?? 5432),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [__dirname + "/../**/*.entity.{js,ts}"],
        synchronize: true,
        retryAttempts: Number(configService.get("DB_RETRY_ATTEMPTS") ?? 10),
        retryDelay: Number(configService.get("DB_RETRY_DELAY_MS") ?? 3000),
        extra: {
          max: Number(configService.get("DB_POOL_MAX") ?? 10),
          idleTimeoutMillis: Number(
            configService.get("DB_POOL_IDLE_TIMEOUT_MS") ?? 30000,
          ),
          connectionTimeoutMillis: Number(
            configService.get("DB_CONNECT_TIMEOUT_MS") ?? 10000,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
