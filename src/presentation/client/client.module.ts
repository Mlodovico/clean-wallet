import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChangeClientPasswordUseCase } from "../../application/client/change-client-password.use-case";
import { ChangeClientStatusUseCase } from "../../application/client/change-client-status.use-case";
import { CreateClientUseCase } from "../../application/client/create-client.use-case";
import { FindClientUseCase } from "../../application/client/find-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import { UpdateClientUseCase } from "../../application/client/update-client.use-case";
import { EventPublisherPort } from "../../application/port/event-publisher.port";
import { PasswordHasherPort } from "../../application/port/password-hasher.port";
import { Client as ClientEntity } from "../../domain/client/client.entity";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { LoggerEventPublisher } from "../../infrastructure/events/LoggerEventPublisher";
import { ClientRepository } from "../../infrastructure/repositories/ClientRepository";
import { ScryptPasswordHasher } from "../../infrastructure/security/ScryptPasswordHasher";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [
    ClientService,
    CreateClientUseCase,
    GetClientUseCase,
    UpdateClientUseCase,
    ChangeClientStatusUseCase,
    ChangeClientPasswordUseCase,
    FindClientUseCase,
    {
      provide: ClientRepositoryPort,
      useClass: ClientRepository,
    },
    {
      provide: PasswordHasherPort,
      useClass: ScryptPasswordHasher,
    },
    {
      provide: EventPublisherPort,
      useClass: LoggerEventPublisher,
    },
  ],
  exports: [
    ClientService,
    CreateClientUseCase,
    GetClientUseCase,
    UpdateClientUseCase,
    ClientRepositoryPort,
  ],
})
export class ClientModule {}
