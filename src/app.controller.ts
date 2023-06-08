import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private clientService: ClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pay')
  async getPaiement() {
    return await this.clientService.getPaiementStatut('BS7769RB', '2023');
  }
  @Get('/sate-pay')
  async getStatOfPay() {
    return await this.clientService.getStatOfPay('BS7769RB');
  }
  @Get('/liquidation')
  async liquidation() {
    return await this.clientService.liquidation('BS7769RB', 'AUTRE', '2021');
  }

  @Get('/all')
  async all() {
    return this.clientService.getAllTvmAmount('BS7769RB', 'AUTRE');
  }
}
