import { parse, compareDesc, format } from 'date-fns';
export function calcultaxe(dateEcheance: string, type: string) {
  let taxe = 0;
  let Tresor = 0;
  let CNSR = 0;
  const Timbres = 2000;
  let total = 0;
  const date = parse(dateEcheance, 'yyyy-MM-dd', new Date());
  const comparisonResultDesc = compareDesc(new Date(), date);

  if (type === 'Véhicule Taxi') {
    Tresor = 1000;
    CNSR = 5500;
    taxe = Timbres + Tresor + CNSR;
  } else if (type === 'Véhicule particulier PTAC<3500kg') {
    Tresor = 2000;
    CNSR = 11000;
    taxe = Timbres + Tresor + CNSR;
  } else if (type === 'Véhicule poids lourds PTAC>3500kg') {
    Tresor = 4000;
    CNSR = 13000;
    taxe = Timbres + Tresor + CNSR;
  }
  if (comparisonResultDesc > 15) {
    total = taxe + 5000;
  } else {
    total = taxe;
  }

  return total;
}

export enum typeVehicule {
  Autre = 'AUTRE',
  TRICYCLE = 'TRICYCLE',
}
