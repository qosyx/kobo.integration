import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { typeVehicule } from './utils/taxe';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private clientService: ClientService,
  ) {}

  @ApiTags("TVM")
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags("TVM")
  @Get('/pay', )
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'year', type: String })
  async getPaiement(@Req() request) {
    const { immatriculatioNumber, year } = request.query;
    return await this.clientService.getPaiementStatut(
      immatriculatioNumber,
      year,
    );
  }
  @ApiTags("TVM")
  @Get('/state-pay')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  async getStatOfPay(@Req() request) {
    const { immatriculatioNumber } = request.query;
    return await this.clientService.getStatOfPay(immatriculatioNumber);
  }
  @ApiTags("TVM")
  @Get('/liquidation')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: typeVehicule })
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

  @ApiTags("TVM")
  @Get('/all')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: typeVehicule })
  async all(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType } = query;
    return this.clientService.getAllTvmAmount(
      immatriculatioNumber,
      vehiculeType,
    );
  }
}
