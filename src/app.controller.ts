import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { ApiQuery } from '@nestjs/swagger';






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
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'year', type: String })
  async getPaiement(@Req() request) {
    const { immatriculatioNumber, year } = request.query;
    return await this.clientService.getPaiementStatut(
      immatriculatioNumber,
      year,
    );
  }
  @Get('/sate-pay')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  async getStatOfPay(@Req() request) {
    const { immatriculatioNumber } = request.query;
    return await this.clientService.getStatOfPay(immatriculatioNumber);
  }
  @Get('/liquidation')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', type: String })
  @ApiQuery({ name: 'year', type: String })
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
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', type: String })
  async all(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType } = query;
    return this.clientService.getAllTvmAmount(
      immatriculatioNumber,
      vehiculeType,
    );
  }
}
