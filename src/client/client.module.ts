import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ClientController],
  exports: [ClientService],
  providers: [ClientService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class ClientModule {}
