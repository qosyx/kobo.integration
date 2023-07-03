import { parse, compareDesc, addDays } from 'date-fns';
import { ApiProperty } from '@nestjs/swagger';

export function calcultaxe(dateEcheance: string, type: string) {
  const tvm = {
    taxe: 0,
    tresor: 0,
    cnsr_taxe: 0,
    penalite_taxe: 0,
    total: 0,
  };

  const Timbres = 2000;

  const date = parse(dateEcheance, 'yyyy-MM-dd', new Date());
  const comparisonResultDesc = compareDesc(new Date(), date);

  if (type === 'CTTAXI') {
    tvm.tresor = 1000;
    tvm.cnsr_taxe = 5500;
    tvm.taxe = Timbres + tvm.tresor + tvm.cnsr_taxe;
  } else if (type === 'CTVL') {
    tvm.tresor = 2000;
    tvm.cnsr_taxe = 11000;
    tvm.taxe = Timbres + tvm.tresor + tvm.cnsr_taxe;
  } else if (type === 'CTPL') {
    tvm.tresor = 4000;
    tvm.cnsr_taxe = 13000;
    tvm.taxe = Timbres + tvm.tresor + tvm.cnsr_taxe;
  }
  if (comparisonResultDesc > 15) {
    tvm.total = tvm.taxe + 5000;
    tvm.penalite_taxe = 5000;
    tvm.total.toFixed();
  } else {
    tvm.total = tvm.taxe;
    tvm.total.toFixed();
  }

  return tvm;
}

export enum typeVehicule {
  Autre = 'AUTRE',
  TRICYCLE = 'TRICYCLE',
}

export function getValidateDate(
  typeVehicule: string,
  lastDate: string,
): string {
  const date = parse(lastDate, 'yyyy-MM-dd', new Date());

  switch (typeVehicule) {
    case 'CTVL':
      return addDays(date, 10).toISOString().split('T')[0];
    case 'CTPL':
      return addDays(date, 10).toISOString().split('T')[0];
    case 'CTTAXI':
      return addDays(date, 10).toISOString().split('T')[0];
  }
}

export class CnsrObject {
  @ApiProperty()
  typevehicule: string;
  @ApiProperty()
  immatriculation: string;
  @ApiProperty()
  datevisite: string;
  @ApiProperty()
  datevalidite: string;
  @ApiProperty()
  agences: string;
  @ApiProperty()
  idsequence: string;
}

export class DgiObject {
  @ApiProperty()
  annee: string;
  @ApiProperty()
  datePaiement: Date;
  @ApiProperty()
  immatriculation: string;
  @ApiProperty()
  montantDu: string;
  @ApiProperty()
  numeroQuittance: string;
  @ApiProperty()
  penalite: string;
  @ApiProperty()
  typeVehicule: string;
}
