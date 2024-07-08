const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const data = {
  id: 1,
  nomOffre: "Appartement Cosy 3 bonapriso",
  typeOffre: "Appartement meublé",
  paysOffre: "Cameroun",
  villeOffre: "Douala",
  descriptifOffre:
    "Doté d'un jacuzzi, l'Appartement Cosy 3 bonapriso est situé à Douala. Vous bénéficierez d'un accès à un balcon et d'un parking privé gratuit.",
  nbreDeChambre: "2",
  nbreDeDouche: "2",
  nbreDeCuisine: "1",
  parking: true,
  adresseEmail: "farisbrandone@yahoo.com",
  prixDuBien: "100000",
  devise: "FCFA/XAF",
  typeDeVente: "par mois en location",
  imageOffre: [],
  tel: "+237655968956",
  dateInset: "04/07/2021",
  lastUpdate: "04/07/2021",
  userId: "",
};

async function seedData(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS dataOffer (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      nomOffre TEXT NOT NULL,
      typeOffre TEXT NOT NULL,
      paysOffre VARCHAR(255) NOT NULL,
      villeOffre VARCHAR(255) NOT NULL,
      descriptifOffre TEXT NOT NULL,
      nbreDeChambre VARCHAR(255) NOT NULL,
      nbreDeDouche  VARCHAR(255) NOT NULL,
      nbreDeCuisine VARCHAR(255) NOT NULL,
      parking BOOLEAN NOT NULL,
      adresseEmail TEXT NOT NULL,
      prixDuBien TEXT NOT NULL,
      devise VARCHAR(255) NOT NULL,
      typeDeVente VARCHAR(255) NOT NULL,
      imageOffre TEXT [] NOT NULL,
      tel VARCHAR(255) NOT NULL,
      dateInset DATE NOT NULL,
      lastUpdate DATE NOT NULL,
      userId UUID NOT NULL,
    );
  `;

    console.log(`Created "dataOffer" table`);

    // Insert data into the "invoices" table
    /* const insertedOfferData = await client.sql`
          INSERT INTO dataOffer (nomOffre,typeOffre,paysOffre, villeOffre,descriptifOffre,nbreDeChambre,nbreDeDouche,nbreDeCuisine,parking,adresseEmail,prixDuBien,devise,typeDeVente,imageOffre,tel,dateInset,lastUpdate,)
          VALUES (${formDataOffer.nomOffre}, ${formDataOffer.typeOffre}, ${formDataOffer.paysOffre}, ${formDataOffer.villeOffre}, ${formDataOffer.descriptifOffre}, ${formDataOffer.nbreDeChambre}, ${formDataOffer.nbreDeDouche}, ${formDataOffer.nbreDeCuisine}, ${formDataOffer.parking}, ${formDataOffer.adresseEmail}, ${formDataOffer.prixDuBien}, ${formDataOffer.devise}, ${formDataOffer.typeDeVente}, ${formDataOffer.imageOffre}, ${formDataOffer.tel}, ${formDataOffer.dateInset}, ${formDataOffer.lastUpdate} )
          ON CONFLICT (id) DO NOTHING;
        `;

    console.log(`Seeded ${insertedOfferData.length} dataOffer`);*/

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    /* const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);*/

    return {
      createTable,
      /*users: insertedUsers,*/
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedData(client);
  await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
