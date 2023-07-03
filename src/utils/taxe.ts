import { parse, compareDesc, format } from 'date-fns';
export function calcultaxe(dateEcheance: string, type: string) {
  
  let tvm = {
    taxe : 0,
    Tresor : 0,
    CNSR : 0,
    total: 0
  };
  
  const Timbres = 2000;
  
  const date = parse(dateEcheance, 'yyyy-MM-dd', new Date());
  const comparisonResultDesc = compareDesc(new Date(), date);

  if (type === 'CTTAXI') {
    tvm.Tresor = 1000;
    tvm.CNSR = 5500;
    tvm.taxe = Timbres + tvm.Tresor + tvm.CNSR;
  } else if (type === 'CTVL') {
    tvm.Tresor = 2000;
    tvm.CNSR = 11000;
    tvm.taxe = Timbres + tvm.Tresor + tvm.CNSR;
  } else if (type === 'CTPL') {
    tvm.Tresor = 4000;
    tvm.CNSR = 13000;
    tvm.taxe = Timbres + tvm.Tresor + tvm.CNSR;
  }
  if (comparisonResultDesc > 15) {
    tvm.total = tvm.taxe + 5000;
  } else {
    tvm.total = tvm.taxe;
  }

  return tvm;
}

export enum typeVehicule {
  Autre = 'AUTRE',
  TRICYCLE = 'TRICYCLE',
}
