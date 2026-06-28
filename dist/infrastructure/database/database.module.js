"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
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
                        idleTimeoutMillis: Number(configService.get("DB_POOL_IDLE_TIMEOUT_MS") ?? 30000),
                        connectionTimeoutMillis: Number(configService.get("DB_CONNECT_TIMEOUT_MS") ?? 10000),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map