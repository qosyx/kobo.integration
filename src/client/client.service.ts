import { HttpService } from '@nestjs/axios';
import { parse, compareDesc, addDays, differenceInDays } from 'date-fns';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import {
  calcultaxe,
  getValidateDate,
  CnsrObject,
  DgiObject,
} from '../utils/taxe';
const requestConfig: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': 'BJ/GOV/DGI/TVM/Statut_Paiement_TVM/v1',
  },
};
const dgiNotifyHeader: AxiosRequestConfig = {
  headers: {
    // 'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    // 'Uxp-Service': 'BJ/GOV/DGI/TVM/Statut_Paiement_TVM/v1',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjExNyIsImlhdCI6MTY3Mzk2NzQ1MiwiZXhwIjoxNzQ2NTQzNDUyfQ.fzb5xBFJaFnwirt3eTme659NUtcd8U0ZTh6a3gOO2rHrVF8nzrBEq4865juZDVbbcS6xkgF5Qc0-B5FgxxpNww',
  },
};

const cnsrNotifyHeader: AxiosRequestConfig = {
  headers: {
    'Uxp-Client': 'BJ/GOV/PNS/PRE-PROD-PORTAIL',
    'Uxp-Service': 'BJ/GOV/CNSR/SECUROUTE/addvoiture/v1',
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
  // CTVL pour

  // CTPL pour Véhicule Poids Lourd

  handleError(error: AxiosError, request: string): Observable<any> {
    console.log(
      `erreur ${new Date()} ${request}  ${error.response.status} ${
        error.response.statusText
      }`,
    );
    switch (error.response.status) {
      case 404:
        throw new NotFoundException(error.response.status, {
          cause: new Error(),
          description: error.response.statusText,
        });
      case 500:
        throw new InternalServerErrorException(error.response.statusText, {
          cause: new Error(),
          description: error.response.statusText,
        });
      default:
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
    }
  }
  // CTTA pour Taxi.
  typeVehicule(type: string): string {
    switch (type) {
      case 'CTVL':
        return 'Véhicule Léger';
      case 'CTPL':
        return 'Véhicule Poids Lourd';
      case 'CTTAXI':
        return 'Taxi';
    }
  }
  async getEtatVehicule(immatriculationNumber: string): Promise<any> {
    this.logger.log('cnsr etat statut');
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `http://pns-ss01.xroad.bj:8081/restapi/${immatriculationNumber}`,
          requestEtatVehicule,
        )
        .pipe(
          catchError((error: AxiosError) =>
            this.handleError(error, immatriculationNumber),
          ),
        ),
    );
    const date = parse(data[0].dateecheance, 'yyyy-MM-dd', new Date());
    const comparisonResultDesc = differenceInDays(new Date(), date);
    console.log(
      `comparisonResultDesc: ${comparisonResultDesc}  ${date}  ${new Date()}`,
    );

    if (comparisonResultDesc >= 60) {
      throw new UnauthorizedException('Vous avez encore 2 mois');
    }
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
          catchError((error: AxiosError) =>
            this.handleError(error, immatriculationNumber),
          ),
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
          catchError((error: AxiosError) =>
            this.handleError(error, immatriculationNumber),
          ),
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
          catchError((error: AxiosError) =>
            this.handleError(error, immatriculationNumber),
          ),
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

    const cnsr = await this.getEtatVehicule(immatriculationNumber);
    console.log(fiscale[0]);

    // eslint-disable-next-line prefer-const
    let { amount, penalite, montantDu } = fiscale[0];
    amount = amount.toFixed(0);
    penalite = penalite.toFixed(0);
    montantDu = montantDu.toFixed(0);
    const year_tvm = fiscale[0]['year'];
    // infoLiqu = infoLiquidation['data']['object']['vehicule'];
    // console.log(infoLiqu);

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
      idsequence,
    } = cnsr;

    const { taxe, tresor, cnsr_taxe, penalite_taxe, total } = calcultaxe(
      dateecheance,
      typevehicule,
    );
    const libelleTypeVehicule = this.typeVehicule(typevehicule);
    const netPayer = (total + parseInt(amount)).toFixed();
    return {
      year_tvm,
      netPayer,
      penalite_taxe,
      libelleTypeVehicule,
      taxe,
      tresor,
      cnsr_taxe,
      total,
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
      idsequence,
      infoLiquidation,
    };
  }

  async notifyerCnsr(cnsrObject: CnsrObject): Promise<any> {
    const datevisite = new Date().toISOString().split('T')[0];
    cnsrObject.datevisite = datevisite;
    cnsrObject.datevalidite = getValidateDate(
      cnsrObject.typevehicule,
      datevisite,
    );

    console.log(
      `ArraycnsrObject ${cnsrObject.datevalidite} eee ${cnsrObject.datevalidite}`,
    );
    console.log(`datevisite ${datevisite}`);

    const ArraycnsrObject = [];
    ArraycnsrObject.push(cnsrObject);

    const { data } = await firstValueFrom(
      this.httpService
        .post<any>(
          `http://pns-ss01.xroad.bj:8081/restapi`,
          ArraycnsrObject,
          cnsrNotifyHeader,
        )
        .pipe(
          catchError((error: AxiosError) =>
            this.handleError(error, cnsrObject.immatriculation),
          ),
        ),
    );

    const response = {
      cnsr: data,
      datevisite: cnsrObject.datevisite,
      datevalidite: cnsrObject.datevalidite,
      typevehicule: cnsrObject.typevehicule,
    };
    console.log(`data ${data.message} ${response}`);
    return response;
  }

  async notifyerDgi(dgiObject: DgiObject): Promise<any> {
    dgiObject.datePaiement = new Date();
    const { data } = await firstValueFrom(
      this.httpService
        .post<any>(
          `https://developper.impots.bj/tvm/api/paiement/e-visite-notification`,
          dgiObject,
          dgiNotifyHeader,
        )
        .pipe(
          catchError((error: AxiosError) =>
            this.handleError(error, dgiObject.immatriculation),
          ),
        ),
    );
    console.log(data);

    return data;
  }
}
