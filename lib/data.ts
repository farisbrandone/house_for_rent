//import { database } from "@/data/dataTypeOffer";
//import { sql } from "@vercel/postgres";
//import { unstable_noStore as noStore, revalidatePath } from "next/cache";
export interface databaseProps {
  id: string;
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
  dateInset: string;
  lastUpdate: string;
  userId: string;
  nameImage: string[];
}
/*export interface dataUserProps 
  {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: $Enums.UserRole;
    isTwoFactorEnabled: boolean;
} | null*/

export interface filterQuery {
  pays?: string;
  ville?: string;
  type_offre?: string;
  page?: string;
}

export type totalDataProps = databaseProps[];

/*export async function getAllData(id: boolean): Promise<databaseProps[]> {
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
}*/

/*export async function getDataWithSearchParams(
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
const ITEMS_PER_PAGE = 10;

export async function fetchTotalData() {
  // Ajoutez noStore() ici pour empêcher la mise en cache de la réponse.
  // Ceci est équivalent à in fetch(..., {cache : 'no-store'}).
  noStore();
  try {
    const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
    `;
    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchFilterTotalData(query: filterQuery) {
  noStore();
  const { pays, ville, type_offre } = query;

  try {
    if (!!pays && !ville && !type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer.paysOffre = ${pays}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!pays && !!ville && !type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!pays && !ville && !!type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. typeOffre = ${type_offre}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!!pays && !!ville && !type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville} AND dataOffer. paysOffre = ${pays}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!pays && !!ville && !!type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville} AND dataOffer. typeOffre = ${type_offre}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!!pays && !ville && !!type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. paysOffre = ${pays} AND dataOffer. typeOffre = ${type_offre}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else if (!!pays && !!ville && !!type_offre) {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer
      WHERE
        dataOffer. paysOffre = ${pays} AND dataOffer. typeOffre = ${type_offre} AND dataOffer. villeOffre = ${ville}

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else {
      const data = await sql`
      SELECT
        COUNT(*) FROM dataOffer

    `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer.");
  }
}

export async function fetchDataOffer(page: number) {
  // Ajoutez noStore() ici pour empêcher la mise en cache de la réponse.
  // Ceci est équivalent à in fetch(..., {cache : 'no-store'}).
  noStore();

  const currentPage = !!page ? page : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchDataOfferById(id: string) {
  noStore();

  try {
    const data = await sql<databaseProps>`
      SELECT
       * FROM dataOffer
      WHERE dataOffer.id = ${id};
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer id.");
  }
}

export async function fetchFilteredDataOffer(query: filterQuery) {
  noStore();
  const { pays, ville, type_offre, page } = query;
  const currentPage = !!page ? Number(page) : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (!!pays && !ville && !type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer.paysOffre = ${pays}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!pays && !!ville && !type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!pays && !ville && !!type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. typeOffre = ${type_offre}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!!pays && !!ville && !type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville} AND dataOffer. paysOffre = ${pays}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!pays && !!ville && !!type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. villeOffre = ${ville} AND dataOffer. typeOffre = ${type_offre}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!!pays && !ville && !!type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. paysOffre = ${pays} AND dataOffer. typeOffre = ${type_offre}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else if (!!pays && !!ville && !!type_offre) {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      WHERE
        dataOffer. paysOffre = ${pays} AND dataOffer. typeOffre = ${type_offre} AND dataOffer. villeOffre = ${ville}
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    } else {
      const data = await sql<databaseProps>`
      SELECT
        * FROM dataOffer
      ORDER BY dataOffer.lastUpdate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return data.rows;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer.");
  }
}

export async function deleteData(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    return { message: "Deleted offer data." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
}*/
