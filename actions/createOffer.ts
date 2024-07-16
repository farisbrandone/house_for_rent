"use server";

//import { db } from "@/lib/db";
import { compressImageProps } from "@/lib/utils";
import { FormSchema } from "@/schemas";
import { sql } from "@vercel/postgres";
//import * as z from "zod";

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
    /* await db.dataOffer.create({
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
    });*/

    await sql`
    INSERT INTO dataOffer (nomOffre,typeOffre,paysOffre, villeOffre,descriptifOffre,nbreDeChambre,nbreDeDouche,nbreDeCuisine,parking,adresseEmail,prixDuBien,devise,typeDeVente,imageOffre,nameImage,tel,dateInset,lastUpdate,userId)
    VALUES (${nomOffre}, ${typeOffre}, ${paysOffre}, ${villeOffre}, ${descriptifOffre}, ${nbreDeChambre}, ${nbreDeDouche}, ${nbreDeCuisine}, ${parking}, ${adresseEmail}, ${prixDuBien}, ${devise}, ${typeDeVente}, ${JSON.stringify(
      imageOffre
    )
      .replace("[", "{")
      .replace("]", "}")},${JSON.stringify(nameImage)
      .replace("[", "{")
      .replace("]", "}")}, ${tel}, ${dateInset}, ${lastUpdate}, ${userId} )
    ON CONFLICT (id) DO NOTHING;
  `;

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
    /* await db.dataOffer.update({
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
    });*/

    await sql`
    UPDATE dataOffer
    SET nomOffre=${nomOffre},typeOffre=${typeOffre},paysOffre=${paysOffre}, villeOffre=${villeOffre},descriptifOffre=${descriptifOffre},nbreDeChambre=${nbreDeChambre},nbreDeDouche=${nbreDeDouche},nbreDeCuisine=${nbreDeCuisine},parking=${parking},adresseEmail= ${adresseEmail},prixDuBien=${prixDuBien},devise=${devise},typeDeVente=${typeDeVente},imageOffre=${JSON.stringify(
      imageOffre
    )
      .replace("[", "{")
      .replace("]", "}")},nameImage=${JSON.stringify(nameImage)
      .replace("[", "{")
      .replace("]", "}")} ,tel=${tel},lastUpdate=${lastUpdate},
    WHERE id = ${offerId}
  `;

    return {
      success: "La mise à jour des données s'est faite avec success!",
    };
  } catch (error) {
    return { error: "présence de champ invalide ou problème de connexion" };
  }
};
