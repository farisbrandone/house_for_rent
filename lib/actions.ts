import { signIn } from "@/auth";
import { databaseProps } from "./data";
("use server");
import { sql } from "@vercel/postgres";
//import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createOfferData(formDataOffer: databaseProps) {
  console.log(formDataOffer);

  // If form validation fails, return errors early. Otherwise, continue.

  // ...
  // Prepare data for insertion into the database

  const date = new Date().toISOString().split("T")[0];
  // Test it out:

  try {
    const insertedOfferData = await sql`
    INSERT INTO dataOffer (nomOffre,typeOffre,paysOffre, villeOffre,descriptifOffre,nbreDeChambre,nbreDeDouche,nbreDeCuisine,parking,adresseEmail,prixDuBien,devise,typeDeVente,imageOffre,tel,dateInset,lastUpdate,userId)
    VALUES (${formDataOffer.nomOffre}, ${formDataOffer.typeOffre}, ${
      formDataOffer.paysOffre
    }, ${formDataOffer.villeOffre}, ${formDataOffer.descriptifOffre}, ${
      formDataOffer.nbreDeChambre
    }, ${formDataOffer.nbreDeDouche}, ${formDataOffer.nbreDeCuisine}, ${
      formDataOffer.parking
    }, ${formDataOffer.adresseEmail}, ${formDataOffer.prixDuBien}, ${
      formDataOffer.devise
    }, ${formDataOffer.typeDeVente}, ${JSON.stringify(formDataOffer.imageOffre)
      .replace("[", "{")
      .replace("]", "}")}, ${formDataOffer.tel}, ${date}, ${date} )
    ON CONFLICT (id) DO NOTHING;
  `;

    console.log(`Seeded ${insertedOfferData} dataOffer`);
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateOfferData(
  formDataOffer: databaseProps,
  id: string
) {
  // If form validation fails, return errors early. Otherwise, continue.
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    UPDATE dataOffer
    SET nomOffre=${formDataOffer.nomOffre},typeOffre=${
      formDataOffer.typeOffre
    },paysOffre=${formDataOffer.paysOffre}, villeOffre=${
      formDataOffer.villeOffre
    },descriptifOffre=${formDataOffer.descriptifOffre},nbreDeChambre=${
      formDataOffer.nbreDeChambre
    },nbreDeDouche=${formDataOffer.nbreDeDouche},nbreDeCuisine=${
      formDataOffer.nbreDeCuisine
    },parking=${formDataOffer.parking},adresseEmail= ${
      formDataOffer.adresseEmail
    },prixDuBien=${formDataOffer.prixDuBien},devise=${
      formDataOffer.devise
    },typeDeVente=${formDataOffer.typeDeVente},imageOffre=${JSON.stringify(
      formDataOffer.imageOffre
    )
      .replace("[", "{")
      .replace("]", "}")},tel=${formDataOffer.tel},lastUpdate=${date},
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  revalidatePath("/dashboardPage");
  redirect("/dashboardPage");
}

export async function deleteOfferData(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath(`/dashboardPage/${id}`);
    return { message: "Deleted offer data." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
}
