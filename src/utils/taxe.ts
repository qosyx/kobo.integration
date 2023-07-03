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
  @ApiProperty({ default: 'CTPL' })
  typevehicule: string;
  @ApiProperty({ default: 'XX0120YY' })
  immatriculation: string;
  @ApiProperty({ default: '2023-06-20' })
  datevisite: string;
  @ApiProperty({ default: '2024-06-020' })
  datevalidite: string;
  @ApiProperty({ default: 'PARAKOU' })
  agences: string;
  @ApiProperty({ default: '100125541' })
  idsequence: string;
}

export class DgiObject {
  @ApiProperty({ default: 2021 })
  annee: string;
  @ApiProperty({ default: '2023-01-15T16:00:00.000Z' })
  datePaiement: Date;
  @ApiProperty({ default: 'BS7369RB' })
  immatriculation: string;
  @ApiProperty({ default: 30000 })
  montantDu: string;
  @ApiProperty({ default: 'AZERTY' })
  numeroQuittance: string;
  @ApiProperty({ default: 0 })
  penalite: string;
  @ApiProperty({ default: 'AUTRES' })
  typeVehicule: string;
}
