import { Controller, Get } from '@nestjs/common';

import { ClientService } from './client.service';
import { Client } from '../../domain/client/Client';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Retorna todos os clientes
  @Get()
  findAll(): Client[] {
    return this.clientService.findAll();
  }
}
