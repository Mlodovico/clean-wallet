import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService], // Exporta o serviço para outros módulos, se necessário
})
export class ClientModule {}
