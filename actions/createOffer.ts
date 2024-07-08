import { db } from "@/lib/db";
import { FormSchema } from "@/schemas";
import * as z from "zod";

export interface offerDataParams {
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
  nameImage: string[];
  tel: string;
  dateInset: string;
  lastUpdate: string;
  userId: string;
}

export interface offerDataParamsWithNull {
  id: string;
  nomOffre: string;
  typeOffre: string;
  paysOffre: string;
  villeOffre: string;
  descriptifOffre: string;
  nbreDeChambre: string | null;
  nbreDeDouche: string | null;
  nbreDeCuisine: string | null;
  parking: boolean;
  adresseEmail: string;
  prixDuBien: string;
  devise: string;
  typeDeVente: string;
  imageOffre: string[];
  nameImage: string[];
  tel: string;
  dateInset: string | null;
  lastUpdate: string | null;
  userId: string;
}

export const createOfferData = async (values: offerDataParams) => {
  const validatedFields = FormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    nomOffre,
    typeOffre,
    paysOffre,
    villeOffre,
    descriptifOffre,
    nbreDeChambre,
    nbreDeDouche,
    nbreDeCuisine,
    parking,
    adresseEmail,
    prixDuBien,
    devise,
    typeDeVente,
    imageOffre,
    nameImage,
    tel,
    dateInset,
    lastUpdate,
    userId,
  } = values;

  await db.dataOffer.create({
    data: {
      nomOffre,
      typeOffre,
      paysOffre,
      villeOffre,
      descriptifOffre,
      nbreDeChambre,
      nbreDeDouche,
      nbreDeCuisine,
      parking,
      adresseEmail,
      prixDuBien,
      devise,
      typeDeVente,
      imageOffre,
      nameImage,
      tel,
      dateInset,
      lastUpdate,
      userId,
    },
  });
  return { success: "Successfully registered. Verify your email!" };
};

export const updateOfferData = async (
  values: offerDataParams,
  offerId: string
) => {
  const validatedFields = FormSchema.safeParse(values);
  if (!validatedFields.success || !offerId) {
    return { error: "Invalid fields or problem of connexion" };
  }

  const {
    nomOffre,
    typeOffre,
    paysOffre,
    villeOffre,
    descriptifOffre,
    nbreDeChambre,
    nbreDeDouche,
    nbreDeCuisine,
    parking,
    adresseEmail,
    prixDuBien,
    devise,
    typeDeVente,
    imageOffre,
    nameImage,
    tel,
    dateInset,
    lastUpdate,
    userId,
  } = values;

  await db.dataOffer.update({
    where: { id: offerId },
    data: {
      nomOffre,
      typeOffre,
      paysOffre,
      villeOffre,
      descriptifOffre,
      nbreDeChambre,
      nbreDeDouche,
      nbreDeCuisine,
      parking,
      adresseEmail,
      prixDuBien,
      devise,
      typeDeVente,
      imageOffre,
      nameImage,
      tel,
      dateInset,
      lastUpdate,
      userId,
    },
  });
  return { success: "Successfully registered. Verify your email!" };
};
