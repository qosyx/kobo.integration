import { Controller, Get, Query, Req } from '@nestjs/common';
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
  async getPaiement(@Req() request) {
    const { immatriculatioNumber, year } = request.query;
    return await this.clientService.getPaiementStatut(
      immatriculatioNumber,
      year,
    );
  }
  @Get('/state-pay')
  async getStatOfPay(@Req() request) {
    const { immatriculatioNumber } = request.query;
    return await this.clientService.getStatOfPay(immatriculatioNumber);
  }
  @Get('/liquidation')
  async liquidation(@Req() request) {
    console.log(request.query);
    const { immatriculatioNumber, vehiculeType, year } = request.query;
    console.log(immatriculatioNumber);

    return await this.clientService.liquidation(
      immatriculatioNumber,
      vehiculeType,
      year,
    );
  }

  @Get('/all')
  async all(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType } = query;
    return this.clientService.getAllTvmAmount(
      immatriculatioNumber,
      vehiculeType,
    );
  }
}
