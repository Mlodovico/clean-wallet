import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateClientUseCase } from "../../application/client/create-client.use-case";
import { Client as ClientEntity } from "../../domain/client/client.entity";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { ClientRepository } from "../../infrastructure/repositories/ClientRepository";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [
    ClientService,
    CreateClientUseCase,
    {
      provide: ClientRepositoryPort,
      useClass: ClientRepository,
    },
  ],
  exports: [ClientService, CreateClientUseCase],
})
export class ClientModule {}
