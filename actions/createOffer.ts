"use server";

import { db } from "@/lib/db";
import { compressImageProps } from "@/lib/utils";
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

export const createOfferData = async (
  values: offerDataParams,
  dodo: compressImageProps
) => {
  const validatedFields = FormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Présence de champs invalide ou problème de connexion" };
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

  try {
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

    return {
      success:
        "L'enregistrement des données s'est faite avec success!\nrafaichissez la page et inserer de nouvelle offre si vous en avez",
    };
  } catch (error) {
    return { error: "Présence de champs invalide ou problème de connexion" };
  }
};

export const updateOfferData = async (
  values: offerDataParams,
  offerId: string,
  dodo: compressImageProps
) => {
  console.log("etonde ekoto", { offerId });
  const validatedFields = FormSchema.safeParse(values);
  if (!validatedFields.success || !offerId) {
    return { error: "présence de champ invalide ou problème de connexion" };
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

  try {
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
    return {
      success: "La mise à jour des données s'est faite avec success!",
    };
  } catch (error) {
    return { error: "présence de champ invalide ou problème de connexion" };
  }
};
