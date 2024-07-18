"use client";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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
  typeOfferForm,
} from "@/data/dataTypeOffer";
import { Input } from "./ui/input";
import InputFile from "./ui/InputFile";

import {
  offerDataParams,
  offerDataParamsWithNull,
  updateOfferData,
} from "@/actions/createOffer";
import { CardsSkeleton } from "./CardsSkeleton";
import { FormSchema } from "@/schemas";
import Spinner from "./spinner";
import { useIsClient } from "@/hooks/use-is-client";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { compressImage } from "@/lib/utils";

function UpdateFormData({
  data,
  userId,
}: {
  data: offerDataParamsWithNull | null;
  userId: string;
}) {
  const [paysSelect, setPaysSelect] = useState("");
  const offerId = data?.id ? data?.id : "";
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const isClient = useIsClient();

  const changeValuePays = (myValue: string) => {
    setPaysSelect(myValue);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(datas: z.infer<typeof FormSchema>) {
    try {
      startTransition(async () => {
        const date = new Date().toISOString();
        const myData = {
          ...datas,
          lastUpdate: date,
          userId: userId,
        };

        const dodo = await compressImage(myData.imageOffre!, 380, 260, 0.6);
        const finalValues: offerDataParams = {
          ...myData,
          imageOffre: [...dodo.tabImage],
          nameImage: [...dodo.tabName],
        };
        const t1 = [...dodo.tabImage];
        const t2 = [...dodo.tabName];

        if (t2.length !== 0 && t1.length !== 0) {
          const data = await updateOfferData(finalValues, offerId);

          if (data.success) setSuccess(data.success);
          if (data?.error) setError(data.error);
        }
        /* const data = await updateOfferData(finalValues, offerId);
        if (data.success) setSuccess(data.success);
        if (data?.error) setError(data.error);*/
      });
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      form.reset();
      setSuccess("");
      setError("");
    }
  }

  /*const handleImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
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
  };*/
  if (!isClient) return <Spinner />;

  if (!data) {
    return <CardsSkeleton />;
  }

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
                    defaultValue={!!field.value ? field.value : data.typeOffre}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'offre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOfferForm.map((value: string, index: number) => (
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
                      defaultValue={!!field.value ? field.value : data.nomOffre}
                      disabled={isPending}
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
                    defaultValue={!!field.value ? field.value : data.paysOffre}
                    disabled={isPending}
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
                    defaultValue={!!field.value ? field.value : data.villeOffre}
                    disabled={isPending}
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
                      defaultValue={
                        !!field.value ? field.value : data.descriptifOffre
                      }
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!!data && (
              <div className="flex flex-col items-center gap-3">
                <p>{`Entrez les élements suivant(optionnel) :`}</p>
                <div className="flex items-center gap-3">
                  <FormField
                    control={form.control}
                    name="nbreDeChambre"
                    render={({ field }) => {
                      const nbreDeChambre = data.nbreDeChambre
                        ? data.nbreDeChambre
                        : "";
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Nombre de chambre
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="exple:2"
                              {...field}
                              className=""
                              defaultValue={
                                !!field.value ? field.value : nbreDeChambre
                              }
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="nbreDeCuisine"
                    render={({ field }) => {
                      const nbreDeChambre = data.nbreDeCuisine
                        ? data.nbreDeCuisine
                        : "";
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Nombre de cuisine
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="exple:2"
                              {...field}
                              className=""
                              defaultValue={
                                !!field.value ? field.value : nbreDeChambre
                              }
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="nbreDeDouche"
                    render={({ field }) => {
                      const nbreDeDouche = data.nbreDeDouche
                        ? data.nbreDeDouche
                        : "";
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Nombre de douche
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="exple:2"
                              {...field}
                              className=""
                              defaultValue={
                                !!field.value ? field.value : nbreDeDouche
                              }
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            )}

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
                          defaultValue={
                            !!field.value ? field.value : data.prixDuBien
                          }
                          disabled={isPending}
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
                        defaultValue={!!field.value ? field.value : data.devise}
                        disabled={isPending}
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
                        defaultValue={
                          !!field.value ? field.value : data.typeDeVente
                        }
                        disabled={isPending}
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
                        <Input
                          placeholder=""
                          {...field}
                          className=""
                          defaultValue={!!field.value ? field.value : data.tel}
                          disabled={isPending}
                        />
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
                          defaultValue={
                            !!field.value ? field.value : data.adresseEmail
                          }
                          disabled={isPending}
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
                      defaultValue={data.imageOffre}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <div className="flex items-center justify-center w-full">
              <Button type="submit" className=" w-[250px]" disabled={isPending}>
                Envoyer
              </Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
}

export default UpdateFormData;
