import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { calcultaxe } from '../utils/taxe';
import { parse, formatDistance, subDays, format } from 'date-fns';

const requestConfig: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': ' BJ/GOV/DGI/TVM/Statut_Paiement_TVM/v1',
  },
};
const requestConfig2: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': 'BJ/GOV/DGI/TVM/SECUROUTE/v1',
  },
};
const requestConfig3: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': 'BJ/GOV/DGI/TVM/Liquidation_TVM/v1',
  },
};
const requestEtatVehicule: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': 'BJ/GOV/CNSR/SECUROUTE/etatvoiture/v1',
  },
};
@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private readonly httpService: HttpService) {}

  async getEtatVehicule(immatriculationNumber: string): Promise<any> {
    this.logger.log('cnsr etat statut');
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `http://pns-ss01.xroad.bj:8081/restapi/${immatriculationNumber}`,
          requestEtatVehicule,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    console.log('dddddddddddddddddd', data[0]);
    return data[0];
  }

  async getPaiementStatut(
    immatriculationNumber: string,
    year: string,
  ): Promise<any> {
    this.logger.log('paiement statut');
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `http://pns-ss01.xroad.bj:8081/restapi/${immatriculationNumber}/${year}`,
          requestConfig,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data.object;
  }
  async getStatOfPay(immatriculationNumber: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `http://pns-ss01.xroad.bj:8081/restapi/${immatriculationNumber}`,
          requestConfig2,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    // console.log(Object.values(data).filter((res) => res != 'notPaid'));
    const notPaid: Array<string> = [];
    Object.keys(data).forEach((key) => {
      if (data[key] == 'notPaid') {
        notPaid.push(key);
      }
    });
    return notPaid;
  }
  async liquidation(
    immatriculationNumber: string,
    marque: string,
    year: string,
  ): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `http://pns-ss01.xroad.bj:8081/restapi/${immatriculationNumber}/${marque}/${year}`,
          requestConfig3,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );
    return {
      data: data,
      montantDu: data.object.montantDu,
      penalite: data.object.penalite,
      totalDu: data.object.montantDu + data.object.penalite,
    };
  }

  async getAllTvmAmount(immatriculationNumber: string, marque: string) {
    let year = await this.getStatOfPay(immatriculationNumber);
    year = year.sort((a, b) => b - a);
    console.log(year);
    const fiscale: Array<any> = [];
    let infoLiquidation: any;
    for (let i = 0; i < year.length; i++) {
      try {
        const r = await this.liquidation(
          immatriculationNumber,
          marque,
          year[i],
        );
        const data = {
          amount: r['totalDu'],
          penalite: r['penalite'],
          montantDu: r['montantDu'],
          year: year[i],
        };
        console.log(data);

        fiscale.push(data);
        infoLiquidation = r;
      } catch (error) {
        console.log(error.message);
      }

      // this.liquidation(immatriculationNumber, marque, year[i]);
    }
    console.log(infoLiquidation.data.object.vehicule.poidsCharge);
    const taxe = calcultaxe(
      infoLiquidation.data.object.vehicule.puissanceMoteur,
      infoLiquidation.data.object.vehicule.poidsCharge,
      infoLiquidation.data.object.vehicule.typeTaxe.code,
      infoLiquidation.data.object.vehicule.poidsCharge,
    );
    const cnsr = await this.getEtatVehicule(immatriculationNumber);
    console.log(fiscale[0]);
    const test = formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
    });
    const dateString = '2023-06-15';
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    console.log(date);
    console.log('test', test);

    const { amount, penalite, montantDu } = fiscale[0];
    const {
      puissanceMoteur,
      chassis,
      dateMiseEnCirculation,
      dateImmatriculation,
      immatricuation,
      nombreDePlace,
      poidsCharge,
      poidsVide,
      poidsUtile,
    } = infoLiquidation['data']['object']['vehicule'];
    const {
      typevehicule,
      dernieredate,
      dateecheance,
      periodevalidite,
      agences,
    } = cnsr;
    return {
      taxe,
      puissanceMoteur,
      chassis,
      dateMiseEnCirculation,
      dateImmatriculation,
      immatricuation,
      nombreDePlace,
      poidsCharge,
      poidsVide,
      poidsUtile,
      amount,
      penalite,
      montantDu,
      fiscale,
      typevehicule,
      dernieredate,
      dateecheance,
      periodevalidite,
      agences,
      infoLiquidation,
    };
  }
}
