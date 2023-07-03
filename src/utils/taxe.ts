import { parse, compareDesc, format } from 'date-fns';
export function calcultaxe(dateEcheance: string, type: string) {
  const tvm = {
    taxe: 0,
    tresor: 0,
    cnsr_taxe: 0,
    penalite: 5000,
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
    tvm.total = tvm.taxe + tvm.penalite;
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
