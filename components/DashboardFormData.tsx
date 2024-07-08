"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

import { database } from "@/data/dataTypeOffer";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { databaseProps, deleteData } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import { offerDataParams } from "@/actions/createOffer";
import { CardsSkeleton } from "./CardsSkeleton";
import { deleteOfferByUserId } from "@/data/offer";

const DashboardFormData = ({
  data,
  id,
}: {
  data: offerDataParams[] | null;
  id: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const deleteElement = async (id: string) => {
    const message = await deleteOfferByUserId(id);
    if (!!message) {
      router.push(`/dashboardPage`);
    } else {
      toast({
        description:
          "Une erreur est survenue pendant la suppression. réessayez SVP",
      });
    }
  };

  return (
    <div>
      {" "}
      <p className="text-2xl font-extrabold text-center max-[365px]:text-xl text-white">
        Liste des offres inserées
      </p>{" "}
      <p className="text-lg font-normal text-center max-[365px]:text-sm text-white">
        Vous pouvez y appliquer des modifications ou tout simplement les
        Supprimer
      </p>
      <Table className="bg-white mt-6">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="font-bold text-lg max-[365px]:text-sm">
            <TableHead>Offre inserée</TableHead>
            <TableHead>Last update</TableHead>
            <TableHead>up..</TableHead>
            <TableHead className="text-right ">Sup..</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-[365px]:text-sm">
          {!!data ? (
            data.map((elt) => (
              <TableRow key={elt.id}>
                <TableCell className="w-[120px] ">{elt.nomOffre}</TableCell>
                <TableCell className="w-[80px] ">{elt.lastUpdate}</TableCell>
                <TableCell
                  className="cursor-pointer hover:bg-green-400 h-full w-[80px] "
                  onClick={() => {
                    router.push(`dashboardPage/${id}`);
                  }}
                >
                  <RefreshCcw className="text-green-900 m-auto" />
                </TableCell>
                <TableCell className="hover:bg-red-400 cursor-pointer overflow-x-clip w-[80px] p-0">
                  <div className="">
                    <Dialog>
                      <DialogTrigger asChild className="p-0">
                        <Button className="hover:bg-red-400 bg-white w-full">
                          <Trash2 className="text-red-700 m-auto" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                          <DialogDescription>
                            &Ecirc;tes-vous s&Ucirc;r de vouloir Supprimer cet
                            &eacute;l&eacute;ment
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="px-0"
                            onClick={() => {
                              deleteElement(id);
                            }}
                          >
                            OUI
                          </Button>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Fermer
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <CardsSkeleton />
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total elements</TableCell>
            <TableCell className="text-right">{database.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DashboardFormData;
