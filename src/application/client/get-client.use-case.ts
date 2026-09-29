import { Injectable } from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { findClientOrFail } from "./client-use-case.helpers";

@Injectable()
export class GetClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  execute(id: string): Promise<Client> {
    return findClientOrFail(this.clientRepository, id);
  }
}
