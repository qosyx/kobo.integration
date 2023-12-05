import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CnsrObject,
  DgiObject,
  categorieVehicule,
  typeVehicule,
} from './utils/taxe';

@Controller()
@ApiTags('TVM')
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
  @Get('/state-pay')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  async getStatOfPay(@Req() request) {
    const { immatriculatioNumber } = request.query;
    return await this.clientService.getStatOfPay(immatriculatioNumber);
  }
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

  @Get('/amount')
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

  @Get('/amountWithoutCnsrApi')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: typeVehicule })
  @ApiQuery({ name: 'categorie', enum: categorieVehicule })
  async getAllTvmAmountWithoutCnsrApi(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType, categorie } = query;
    return this.clientService.getAllTvmAmountWithoutCnsrApi(
      immatriculatioNumber,
      vehiculeType,
      categorie,
    );
  }
  @Post('/cnsrNotify')
  async cnsrNotify(@Body() cnsrObject: CnsrObject) {
    console.log(
      `controller: ${cnsrObject.typevehicule} ${cnsrObject.immatriculation} ${cnsrObject.agences}`,
    );

    return this.clientService.notifyerCnsr(cnsrObject);
  }

  @Post('/dgiNotify')
  async dgiNotify(@Body() dgiObject: DgiObject) {
    console.log(new Date());

    return this.clientService.notifyerDgi(dgiObject);
  }

  @Get('/cnsrEtatVehicule')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  async getEtatVehicule(@Query() query) {
    console.log(query);
    const { immatriculatioNumber } = query;
    return this.clientService.getEtatVehicule(immatriculatioNumber);
  }

  @Get('/getTaxeCnsr')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: categorieVehicule })
  async getTaxeCnsr(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType } = query;
    return this.clientService.getTaxeCnsr(immatriculatioNumber, vehiculeType);
  }

  @Get('/amountWithDgiOption')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: typeVehicule })
  async refersToRightsFunction(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType } = query;
    return this.clientService.refersToRightsFunction(
      immatriculatioNumber,
      vehiculeType,
    );
  }

  @Get('/refersToRightsFunctionWithoutCnsrApi')
  @ApiQuery({ name: 'immatriculatioNumber', type: String })
  @ApiQuery({ name: 'vehiculeType', enum: typeVehicule })
  @ApiQuery({ name: 'categorie', enum: categorieVehicule })
  async refersToRightsFunctionWithoutCnsrApi(@Query() query) {
    console.log(query);
    const { immatriculatioNumber, vehiculeType, categorie } = query;
    return this.clientService.refersToRightsFunctionWithoutCnsrApi(
      immatriculatioNumber,
      vehiculeType,
      categorie,
    );
  }
}
