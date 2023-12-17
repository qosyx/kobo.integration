import { Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('TVM')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private clientService: ClientService,
  ) {}

  @Put('/dce')
  async dce() {
    return this.clientService.dce();
  }
}
