import { Resend } from "resend";
import * as nodemailer from "nodemailer";
const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    // TODO: Add a template for this email
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  /* await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    // TODO: Add a template for this email
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });*/
  let value = "";
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    var mailoutput = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mamaisonalouer.com</title>
   
    <style>
    body {
        background-color: #ffffff; /* Couleur d'arrière-plan de la page (blanc) */
        margin: 0; /* Supprimer la marge par défaut du corps */
        font-family: Arial, sans-serif; /* Utiliser une police lisible */
         display:flex;
         flex-direction:column;
         gap:0px;
         padding:10px;
      }
       .div1{
         font-size:30px;
         font-weight:bold;
         color:#006ce4;
        
       }
       .div2{
            font-size:20px;
           text-wrap:wrap;
            margin-top:-25px;
       }
     </style>
     
     </head>
     
      <body>
          <div class="div1">
          <p>www.mamaisonalouer.com</p>
          </div>
          <div class="div2">
          <p>😄 Le site de référence lorsque vous recherchez des biens immobiliers ou lorsque vous souhaitez exposer au plus grand nombre votre bien immobilier 😄</p>
         <p>Cliquez ici 👉 <a href="${resetLink}">pour mettre à jour votre mots de passe</a></p>
          </div>
       </body>
       </html>
       `;
    /*${resetLink}*/
    var mailOptions = {
      from: "farisbrandone0@gmail.com",
      to: email,
      subject: `Mise à jour du mots de passe`,
      html: mailoutput,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        value = "une erreurs est survenue pendant l'envoie d'email";
      } else {
        value = "l'email envoyé avec succcess";
      }
    });
    if (value === "une erreurs est survenue pendant l'envoie d'email") {
      return { error: value };
    }
    if (value === "l'email envoyé avec succcess") {
      return { success: value };
    }
  } catch (error) {
    console.log(error);
    return { error: "une erreurs est survenue pendant l'envoie d'email" };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  console.log("data-error");
  /* try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email.",
      // TODO: Add a template for this email
      html: `<p>Click <a href="${confirmLink}">here</a> to verify email.</p>`,
    });
    console.log({ data, error });
  } catch (error) {
    throw new Error("une erreurs est survenue pendant l'envoie d'email");
  }*/
  let value = "";

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    console.log("my1");
    var mailoutput = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mamaisonalouer.com</title>
   
    <style>
    body {
        background-color: #ffffff; /* Couleur d'arrière-plan de la page (blanc) */
        margin: 0; /* Supprimer la marge par défaut du corps */
        font-family: Arial, sans-serif; /* Utiliser une police lisible */
         display:flex;
         flex-direction:column;
         gap:0px;
         padding:10px;
      }
       .div1{
         font-size:20px;
         font-weight:bold;
         color:#006ce4;
       }
       .div2{
            font-size:15px;
           text-wrap:wrap;
            margin-top:-25px;
       }
       
       a{
         color:#006ce4;
         cursor:pointer; 
       }
     </style>
     
     </head>
     
      <body>
          <div class="div1">
          <p>www.mamaisonalouer.com</p>
          </div>
          
          <div class="div2">
          <p>😄 Le site de référence lorsque vous recherchez des biens immobiliers ou lorsque vous souhaitez exposer au plus grand nombre votre bien immobilier 😄</p>
         <p>Cliquez ici 👉 <a href="${confirmLink}">pour vérifier votre email</a></p>
          </div>
       </body>
       </html>
       `;
    var mailOptions = {
      from: "farisbrandone0@gmail.com",
      to: email,
      subject: `Vérification de votre email `,
      html: mailoutput,
    };
    console.log("my2");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        value = "une erreurs est survenue pendant l'envoie d'email";
      } else {
        console.log("my4");
        value = "l'email envoyé avec succcess";
      }
    });
    if (value === "une erreurs est survenue pendant l'envoie d'email") {
      return { error: value };
    }
    if (value === "l'email envoyé avec succcess") {
      return { success: value };
    }
  } catch (error) {
    console.log(error);
    return { error: "une erreurs est survenue pendant l'envoie d'email" };
  }
};
