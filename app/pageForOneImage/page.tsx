//import CardOneOffer from "@/components/CardOneOffer";
//import { CardsSkeleton } from "@/components/CardsSkeleton";

//import { getOfferByUserId } from "@/data/offer";
import React from "react";

const DataForOffer = async (
  /*searchParams,*/
  {
    /* searchParams?: {
    id?: string;
  };*/
  }
) => {
  // const myId = searchParams?.id;

  //const dataForOneOffer = await getOfferByUserId("2");

  /*if (!myId) {
    throw new Error("une ereur est survenu pendant le processus de traitement");
  }*/

  return (
    <div className="mt-5 lg:w-[1024px]">
      {/*<CardOneOffer dataForOneOffer={dataForOneOffer} />*/}
    </div>
  );
};

export default DataForOffer;
