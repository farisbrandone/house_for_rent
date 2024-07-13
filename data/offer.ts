"use server";
import { filterQuery } from "@/lib/data";
import { db } from "@/lib/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

const ITEMS_PER_PAGE = 10;

export const getAllOffer = async (page: number) => {
  noStore();

  const currentPage = !!page ? page : 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const allOfferForUser = await db.dataOffer.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return allOfferForUser;
  } catch {
    throw new Error("Failed to fetch data offer.");
    //return null;
  }
};
export const getTotalOffer = async () => {
  noStore();
  try {
    const allOfferForUser = await db.dataOffer.findMany();

    const totalPages = Math.ceil(
      Number(allOfferForUser.length / ITEMS_PER_PAGE)
    );
    return totalPages;
  } catch {
    return null;
  }
};

export const getAllOfferByUserId = async (id?: string) => {
  try {
    const allOfferForUser = await db.dataOffer.findMany({
      where: { userId: id },
    });
    return allOfferForUser;
  } catch {
    return null;
  }
};

export const deleteOfferByUserId = async (id?: string) => {
  console.log("dounga", { id });
  try {
    const OfferDelete = await db.dataOffer.delete({
      where: { id },
    });
    return OfferDelete;
  } catch {
    return null;
  }
};

export const getOfferByUserId = async (id?: string) => {
  try {
    const Offer = await db.dataOffer.findFirst({
      where: { id },
    });
    return Offer;
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
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else if (!pays && !!ville && !type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser;
    } else if (!pays && !ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else if (!!pays && !!ville && !type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else if (!pays && !!ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else if (!!pays && !ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else if (!!pays && !!ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
    } else {
      const allOfferForUser = await db.dataOffer.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser;
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
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else if (!pays && !!ville && !type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      return allOfferForUser.length;
    } else if (!pays && !ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else if (!!pays && !!ville && !type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else if (!pays && !!ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { typeOffre: type_offre, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else if (!!pays && !ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, typeOffre: type_offre },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else if (!!pays && !!ville && !!type_offre) {
      const allOfferForUser = await db.dataOffer.findMany({
        where: { paysOffre: pays, villeOffre: ville },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    } else {
      const allOfferForUser = await db.dataOffer.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
      });

      return allOfferForUser.length;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data offer.");
  }
}
