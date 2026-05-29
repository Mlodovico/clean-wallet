import { Controller, Get, Post, Put } from '@nestjs/common';

import { ClientService } from './client.service';
import { Client } from '../../domain/client/Client';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Client[] {
    return this.clientService.findAll();
  }

  @Post()
  CreateNewClient(newClient: Client): Client {
    return this.clientService.create(newClient);
  }

  @Put(':id')
  updateClient(id: string, updateData: Partial<Client>): Client | undefined {
    return this.clientService.update(id, updateData);
  }

  @Get(':id')
  findById(id: string): Client | undefined {
    return this.clientService.findOne(id);
  }
}
