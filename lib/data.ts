import { database } from "@/data/dataTypeOffer";

export interface databaseProps {
  id: number;
  nomOffre: string;
  typeOffre: string;
  paysOffre: string;
  villeOffre: string;
  descriptifOffre: string;
  nbreDeChambre: string;
  nbreDeDouche: string;
  nbreDeCuisine: string;
  parking: boolean;
  adresseEmail: string;
  prixDuBien: string;
  devise: string;
  typeDeVente: string;
  imageOffre: string[];
  tel: string;
}

export type totalDataProps = databaseProps[];

export async function getAllData(id: boolean): Promise<databaseProps[]> {
  try {
    const data = await new Promise<totalDataProps>((resolve, reject) => {
      if (id) {
        setTimeout(() => {
          resolve(database);
        }, 1500);
      } else reject(["No data found"]);
    });
    return data;
  } catch (error) {
    console.log(["error found"]);
    return [];
  }
}

export async function getDataWithSearchParams(
  pays?: string | null,
  ville?: string | null,
  offre?: string | null
) {
  try {
    const data = await new Promise<totalDataProps>((resolve, reject) => {
      if (!!pays && !ville && !offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.paysOffre === pays;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!pays && !!ville && !offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.villeOffre === ville;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!pays && !ville && !!offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.typeOffre === offre;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!!pays && !!ville && !offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.paysOffre === pays && value.villeOffre === ville;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!pays && !!ville && !!offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.typeOffre === offre && value.villeOffre === ville;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!!pays && !ville && !!offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return value.typeOffre === offre && value.paysOffre === pays;
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else if (!!pays && !!ville && !!offre) {
        const result = database.filter(
          (value: databaseProps, index: number) => {
            return (
              value.typeOffre === offre &&
              value.paysOffre === pays &&
              value.villeOffre === ville
            );
          }
        );
        setTimeout(() => {
          resolve(result);
        }, 1500);
      } else {
        setTimeout(() => {
          resolve([]);
        }, 1500);
      }
    });
    return data;
  } catch (error) {
    console.log(["error found"]);
    return [];
  }
}
