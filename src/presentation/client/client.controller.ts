import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { CreateClientInput } from "../../application/client/create-client.use-case";
import { Client } from "../../domain/client/Client";
import { ClientService } from "./client.service";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Client[] {
    return this.clientService.findAll();
  }

  @Post()
  createNewClient(@Body() newClient: CreateClientInput): Promise<Client> {
    return this.clientService.create(newClient);
  }

  @Put(":id")
  updateClient(
    @Param("id") id: string,
    @Body() updateData: Partial<Client>,
  ): Client | undefined {
    return this.clientService.update(id, updateData);
  }

  @Get(":id")
  findById(@Param("id") id: string): Client | undefined {
    return this.clientService.findOne(id);
  }
}
