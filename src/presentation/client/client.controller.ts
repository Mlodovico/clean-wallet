import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { CreateClientInput } from "../../application/client/create-client.use-case";
import { FindClientInput } from "../../application/client/find-client.use-case";
import { UpdateClientInput } from "../../application/client/update-client.use-case";
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

  @Get("lookup")
  findBy(@Query() criteria: FindClientInput): Promise<Client> {
    return this.clientService.findBy(criteria);
  }

  @Put(":id")
  updateClient(
    @Param("id") id: string,
    @Body() updateData: Omit<UpdateClientInput, "id">,
  ): Promise<Client> {
    return this.clientService.update(id, updateData);
  }

  @Patch(":id/activate")
  activate(@Param("id") id: string): Promise<Client> {
    return this.clientService.changeStatus(id, "activate");
  }

  @Patch(":id/suspend")
  suspend(@Param("id") id: string): Promise<Client> {
    return this.clientService.changeStatus(id, "suspend");
  }

  @Patch(":id/deactivate")
  deactivate(@Param("id") id: string): Promise<Client> {
    return this.clientService.changeStatus(id, "deactivate");
  }

  @Patch(":id/password")
  @HttpCode(HttpStatus.NO_CONTENT)
  changePassword(
    @Param("id") id: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ): Promise<void> {
    return this.clientService.changePassword(
      id,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Get(":id")
  findById(@Param("id") id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }
}
