"use client";

import React from "react";
import { database } from "@/data/dataTypeOffer";
import Image from "next/image";
import {
  Bath,
  Bed,
  CarFront,
  CookingPot,
  Mail,
  PhoneCall,
  Warehouse,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CardOneOffer = () => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 w-full">
      <div className="w-full">
        <h1 className="text-3xl font-extrabold text-wrap text-[#003ce4]">
          {database[0].nomOffre}
        </h1>
        <p className="text-xl text-wrap">
          {" "}
          <span></span>
          <span>{database[0].villeOffre}</span>{" "}
          <span> {database[0].paysOffre} </span>
        </p>
        <p className="text-xl ">
          dernière mise a jour le : <span>{database[0].lastUpdate}</span>
        </p>
        <p className="text-xl">
          <span>Valeur :</span> <span>{database[0].prixDuBien}</span>{" "}
          <span>{database[0].devise}</span>{" "}
          <span> {database[0].typeDeVente} </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center cursor-pointer mt-6 shadow-2xl">
        <Dialog>
          <DialogTrigger asChild={false} className="flex flex-wrap gap-4">
            {database[0].imageOffre.map((url: string, index: number) => (
              <Image
                src={url}
                alt={database[0].nomOffre}
                key={index}
                width={250}
                height={250}
              />
            ))}
          </DialogTrigger>
          <DialogContent className="content-center">
            <DialogHeader className="-ml-[55rem]">
              <DialogTitle>Parcourez les images</DialogTitle>
            </DialogHeader>
            <div>
              <Carousel className="w-[450px] max-[500px]:w-350px">
                <CarouselContent>
                  {database[0].imageOffre.map((url: string, index: number) => (
                    <CarouselItem key={index} className=" ">
                      <div className="p-1 flex items-center justify-center max-[500px]:justify-start">
                        <Card className="flex items-center justify-center">
                          <CardContent className="flex flex-col items-center justify-center p-0 ">
                            {
                              <Image
                                src={url}
                                alt={database[0].nomOffre}
                                key={index}
                                width={250}
                                height={250}
                                className="w-[250px] h-[250px] "
                              />
                            }
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <DialogFooter className="justify-center -ml-[4rem]">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap w-full gap-8 mt-6">
        <p className="flex gap-1">
          {" "}
          <span className="mr-1">
            <Warehouse />
          </span>{" "}
          <span>{database[0].typeOffre}</span>
        </p>
        <p className="flex gap-1">
          {" "}
          <span className="mr-1">
            <Bed />
          </span>{" "}
          <span>{database[0].nbreDeChambre}CH</span>{" "}
        </p>
        <p className="flex gap-1">
          <span className="mr-1">
            <CookingPot />
          </span>{" "}
          <span>{database[0].nbreDeCuisine}CUI</span>
        </p>
        <p className="flex gap-1">
          <span className="mr-1">
            <Bath />
          </span>{" "}
          <span>{database[0].nbreDeDouche}DCH</span>
        </p>

        {database[0].parking && (
          <p className="flex gap-1">
            <span className="mr-2">
              <CarFront />
            </span>{" "}
            Parking
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-8 mt-5 w-full">
        <h2 className="text-xl font-bold">Nos contacts pour nous joindre :</h2>
        {database[0].tel && (
          <p className="flex">
            <span className="mr-2">
              <PhoneCall />
            </span>
            {database[0].tel}
          </p>
        )}
        {database[0].adresseEmail && (
          <p className="flex">
            <span className="mr-2">
              <Mail />
            </span>
            {database[0].adresseEmail}
          </p>
        )}
      </div>
      <div className="mt-5">
        <h1 className="text-2xl text-[#003ce4] font-bold">
          Detais sur l&apos;offre :
        </h1>
        <div className="text-wrap">{database[0].descriptifOffre}</div>
      </div>
    </div>
  );
};

export default CardOneOffer;
