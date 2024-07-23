"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
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
import { compressImage, compressImageProps } from "@/lib/utils";
import { User } from "@/types/next-auth";
import { useIsClient } from "@/hooks/use-is-client";
import { FormSchema } from "@/schemas";
import { mydata } from "@/data/appartment";
import { createOfferData, offerDataParams } from "@/actions/createOffer";
import Spinner from "./spinner";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  user?: User;
}

function FormDataOffer({ user }: UserInfoProps) {
  const router = useRouter();
  const userId = user?.id;
  const eltm: React.MutableRefObject<compressImageProps[] | undefined> =
    useRef();
  const eltm2: React.MutableRefObject<boolean | undefined> = useRef();

  const [paysSelect, setPaysSelect] = useState("");
  const [stateUrlImage, setStateUrlImage] = useState<compressImageProps[]>([]);
  const [loading, setLoading] = useState(false);
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
          dateInset: date,
          lastUpdate: date,
          userId: user?.id ? user?.id : "",
        };

        const dodo = await compressImage(myData.imageOffre!, 380, 260, 0.8);
        const finalValues: offerDataParams = {
          ...myData,
          imageOffre: [...dodo.tabImage],
          nameImage: [...dodo.tabName],
        };
        const t1 = [...dodo.tabImage];
        const t2 = [...dodo.tabName];

        if (t2.length !== 0 && t1.length !== 0) {
          console.log(finalValues);
          const data = await createOfferData(finalValues, {
            tabImage: t1,
            tabName: t2,
          });

          if (data.success) setSuccess(data.success);
          if (data?.error) setError(data.error);
          form.reset();
        }
      });
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      form.reset();
      setSuccess("");
      setError("");
    }
  }

  /*useEffect(() => {
    if (!!success || !!error) {
      console.log("doudou");
      form.reset();
      router.push("/dashboardPage/InsertData");
      router.refresh();
    }
  }, [success, error, setError, setSuccess]);*/

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

  return (
    <div className="bg-white border-4 rounded-xl border-[#006ce4] p-5 flex flex-col items-center gap-4 shadow-2xl">
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
                      disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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
                        {!!(/*form.getValues("paysOffre")*/ paysSelect) &&
                          cityOfCountry[
                            `${paysSelect /*form.getValues("paysOffre")*/}`
                          ].map((value: string, index: number) => (
                            <SelectItem value={value} key={index}>
                              {value}
                            </SelectItem>
                          ))}
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
                      disabled={isPending}
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
                        <Input
                          disabled={isPending}
                          placeholder="exple:2"
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
                  name="nbreDeCuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Nombre de cuisine
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="exple:2"
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
                  name="nbreDeDouche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Nombre de douche
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="exple:2"
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
                          disabled={isPending}
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
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
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
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
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
                          disabled={isPending}
                          placeholder=""
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
                  name="adresseEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
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
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <div className="flex items-center justify-center w-full">
              <Button type="submit" disabled={isPending} className=" w-[250px]">
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
