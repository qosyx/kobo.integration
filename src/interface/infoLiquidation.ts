export interface infoLiqu {
  puissanceMoteur: string;
  chassis: string;
  dateMiseEnCirculation: string;
  dateImmatriculation: string;
  immatricuation: string;
  nombreDePlace: string;
  poidsCharge: string;
  poidsVide: string;
  poidsUtile: string;
}

function getUserData(): UserData {
  // Simulation de récupération des données utilisateur
  const userData: UserData = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return userData;
}
