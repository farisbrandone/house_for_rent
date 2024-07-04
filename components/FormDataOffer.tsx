"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cityOfCountry,
  deviseData,
  formuleDuPrix,
  listOfSelectCountry,
  typeOffer,
} from "@/data/dataTypeOffer";
import { Input } from "./ui/input";
import InputFile from "./ui/InputFile";
import { compressImage, compressImageProps } from "@/lib/utils";
import { CircleX, Loader2, Paperclip } from "lucide-react";
import Image from "next/image";

const FormSchema = z.object({
  typeOffre: z
    .string({
      required_error: "La selection d'un type d'offre est requis.",
    })
    .min(3),
  nomOffre: z
    .string({
      required_error: "La Fourniture d'un nom a votre offre est requis.",
    })
    .min(5),
  paysOffre: z
    .string({
      required_error: "La selection d'un pays est requis.",
    })
    .min(3),
  villeOffre: z
    .string({
      required_error: "La selection d'une ville est requis.",
    })
    .min(3),
  descriptifOffre: z
    .string()
    .min(100, {
      message: "Le descriptif doit avoir au moins 100 charactères.",
    })
    .max(2000, {
      message: "Le descriptif doit avoir au plus 2000 charactères.",
    }),
  nbreDeChambre: z.string().optional(),
  nbreDeCuisine: z.string().optional(),
  nbreDeDouche: z.string().optional(),
  prixDuBien: z
    .string({
      required_error: "vous devez entrez un prix à votre bien",
    })
    .min(2),
  devise: z
    .string({
      required_error: "vous devez selectionner une devise",
    })
    .min(2),
  typeDeVente: z
    .string({
      required_error:
        "Vous devez selectionner la formule associée à votre prix",
    })
    .min(5),
  adresseEmail: z.string().email(),
  tel: z.string().optional(),
  imageOffre: z.any().array().optional(),
});

function FormDataOffer() {
  const eltm: React.MutableRefObject<compressImageProps[] | undefined> =
    useRef();
  const eltm2: React.MutableRefObject<boolean | undefined> = useRef();

  const [paysSelect, setPaysSelect] = useState("");
  const [stateUrlImage, setStateUrlImage] = useState<compressImageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const changeValuePays = (myValue: string) => {
    setPaysSelect(myValue);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("deedede");
    if (data.imageOffre) {
      const dodo = await compressImage(data.imageOffre, 380, 260, 0.8);
      console.log(dodo);
    }
    console.log(JSON.stringify(data, null, 2));
  }

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    const filesResult: File[] = [];
    try {
      setLoading(true);

      if (
        !e.target.files ||
        e.target.files.length === 0 ||
        e.target.files.length > 3
      ) {
        throw new Error("You must select an image to upload.");
      }
      const files = e.target.files;
      const goo = Object.entries(files);
      goo.forEach((elt: [string, File], index) => {
        filesResult.push(elt[1]);
      });

      const result = await compressImage(filesResult, 380, 260, 0.4);

      console.log({ result });
      setStateUrlImage((prevState) => [...prevState, ...result]);
      console.log({ loading });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading((prev) => false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-white border-4 rounded-xl border-[#006ce4] p-5 flex flex-col items-center gap-4">
      <h1 className="text-wrap text-2xl font-extrabold">
        Insérer les caractéristiques de votre offre
      </h1>
      {
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="typeOffre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selectionner un type d&apos;offre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'offre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOffer.chambre.map((value: string, index: number) => (
                        <SelectItem value={value} key={index}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomOffre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center w-full">
                    Donnez un nom à votre offre
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exple:Appartement meublée - Douala cameroun quartier Bonamoussadi"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paysOffre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Selectionner le pays ou se trouve l&apos;offre
                  </FormLabel>
                  <Select
                    onValueChange={
                      /*field.onChange*/ (value) => {
                        form.setValue("paysOffre", value);
                        changeValuePays(value);
                      }
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pays de l'offre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pays</SelectLabel>
                        {listOfSelectCountry.map(
                          (value: string, index: number) => (
                            <SelectItem value={value} key={index}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="villeOffre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Selectionner la ville ou se trouve l&apos;offre
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ville de l'offre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Ville - {paysSelect}</SelectLabel>
                        {!!paysSelect &&
                          cityOfCountry[`${paysSelect}`].map(
                            (value: string, index: number) => (
                              <SelectItem value={value} key={index}>
                                {value}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptifOffre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Décrivez encore plus votre offre en mettant en valeurs ces
                    atouts
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre offre dans les détails et mettez en valeurs ces atouts."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-3">
              <p>{`Entrez les élements suivant(optionnel) :`}</p>
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="nbreDeChambre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Nombre de chambre
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="exple:2" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nbreDeCuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Nombre de cuisine
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="exple:2" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nbreDeDouche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Nombre de douche
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="exple:2" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p>Entrez le prix de votre bien : </p>
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="prixDuBien"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        a quel prix louez/vendez-vous
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exple: 10 000"
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="devise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>devise</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="FCFA/XAF" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {deviseData.map((value: string, index: number) => (
                            <SelectItem value={value} key={index}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typeDeVente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formule</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Par jour en location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formuleDuPrix.map((value: string, index: number) => (
                            <SelectItem value={value} key={index}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p>entrez Vos contact</p>
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="tel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        {`numéro de telephone(optionnel)`}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} className="" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adresseEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exple:lando@dco.com"
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="imageOffre"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputFile
                      accept="image/png, image/jpg, image/jpeg, image/pdf"
                      multiple
                      name="imageOffre"
                      mode="append"
                      form={form}
                      defaultValue={[]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center w-full">
              <Button type="submit" className=" w-[250px]">
                Envoyer
              </Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
}

export default FormDataOffer;
