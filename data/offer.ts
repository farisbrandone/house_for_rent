"use server";
import { offerDataParamsWithNull } from "@/actions/createOffer";
import { filterQuery } from "@/lib/data";
//import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

export const getAllOffer = async (page: number) => {
  noStore();

  const currentPage = !!page ? page : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    /* const user = await sql`SELECT * FROM dataOffer
    JOIN User ON User.id = dataOffer.userId
    ORDER BY dataOffer.lastUpdate
    `;
    console.log({ user: user.fields });*/
    /* const allOfferForUser = await db.dataOffer.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    return allOfferForUser;
     ORDER BY dataOffer.lastUpdate DESC*/

    const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT * FROM "dataOffer"
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return allOfferForUser.rows;
  } catch (error) {
    //console.log({ error });
    throw new Error("erro");
    //return null;
  }
};
export const getTotalOffer = async () => {
  noStore();
  try {
    // const allOfferForUser = await db.dataOffer.findMany();

    /*const totalPages = Math.ceil(
      Number(allOfferForUser.length / ITEMS_PER_PAGE)
    );
    return totalPages;*/

    const count = await sql`SELECT COUNT(*) FROM "dataOffer"`;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch {
    return null;
  }
};

export const getAllOfferByUserId = async (id?: string) => {
  noStore();
  try {
    /* const allOfferForUser = await db.dataOffer.findMany({
      where: { userId: id },
    });
    return allOfferForUser;*/

    const allOfferForUser = await sql<offerDataParamsWithNull>`
    SELECT
      * FROM "dataOffer"
    WHERE userId=${id}
    ORDER BY dataOffer.lastUpdate DESC
  `;
    return allOfferForUser.rows;
  } catch {
    return null;
  }
};

export const deleteOfferByUserId = async (id?: string) => {
  noStore();

  try {
    /*const OfferDelete = await db.dataOffer.delete({
      where: { id },
    });
    return OfferDelete;*/

    const OfferDelete =
      await sql<offerDataParamsWithNull>`DELETE FROM "dataOffer" WHERE id = ${id}`;

    return OfferDelete.rows[0];
  } catch {
    return null;
  }
};

export const getOfferByUserId = async (id?: string) => {
  noStore();
  try {
    /*const Offer = await db.dataOffer.findFirst({
      where: { id },
    });
    return Offer;*/

    const Offer = await sql`SELECT * FROM "dataOffer" WHERE id=${id}`;

    return Offer.rows[0] as offerDataParamsWithNull;
  } catch {
    throw new Error("probleme survenue");
  }
};

export async function getSearchOffer(query: filterQuery) {
  noStore();
  const { pays, ville, type_offre, page } = query;
  const currentPage = !!page ? Number(page) : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (!!pays && !ville && !type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "paysOffre"=${pays}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!pays && !!ville && !type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "villeOffre"=${ville}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!pays && !ville && !!type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "typeOffre"=${type_offre}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!!pays && !!ville && !type_offre) {
      /*const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "paysOffre"=${pays} AND "villeOffre"=${ville}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!pays && !!ville && !!type_offre) {
      /*const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "typeOffre"=${type_offre} AND "villeOffre"=${ville}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!!pays && !ville && !!type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "paysOffre"=${pays} AND "typeOffre"=${type_offre}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else if (!!pays && !!ville && !!type_offre) {
      /*const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer"
      WHERE "paysOffre"=${pays} AND "villeOffre"=${ville} AND "typeOffre"=${type_offre}
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    } else {
      /* const allOfferForUser = await db.dataOffer.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;*/

      const allOfferForUser = await sql<offerDataParamsWithNull>`
      SELECT
        * FROM "dataOffer" 
      ORDER BY "lastUpdate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
      return allOfferForUser.rows;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer.");
  }
}

export async function getTotalSearchOffer(query: filterQuery) {
  noStore();
  const { pays, ville, type_offre, page } = query;
  const currentPage = !!page ? Number(page) : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (!!pays && !ville && !type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count =
        await sql`SELECT COUNT(*) FROM "dataOffer" WHERE "paysOffre"=${pays} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!pays && !!ville && !type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count =
        await sql`SELECT COUNT(*) FROM "dataOffer" WHERE "villeOffre"=${ville} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!pays && !ville && !!type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count =
        await sql`SELECT COUNT(*) FROM "dataOffer" WHERE "typeOffre"=${type_offre} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!!pays && !!ville && !type_offre) {
      /*  const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count = await sql`SELECT COUNT(*) FROM "dataOffer" 
        WHERE "paysOffre"=${pays} AND "villeOffre"=${ville} 
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!pays && !!ville && !!type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count = await sql`SELECT COUNT(*) FROM "dataOffer"
      WHERE "typeOffre"=${type_offre} AND "villeOffre"=${ville} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!!pays && !ville && !!type_offre) {
      /*const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count = await sql`SELECT COUNT(*) FROM "dataOffer" 
       WHERE "paysOffre"=${pays} AND "villeOffre"=${ville} AND "typeOffre"=${type_offre} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else if (!!pays && !!ville && !!type_offre) {
      /* const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count = await sql`SELECT COUNT(*) FROM "dataOffer" 
      WHERE "paysOffre"=${pays} AND "villeOffre"=${ville} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } else {
      /* const allOfferForUser = await db.dataOffer.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;*/

      const count = await sql`SELECT COUNT(*) FROM "dataOffer"  
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer.");
  }
}
