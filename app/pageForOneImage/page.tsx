import CardOneOffer from "@/components/CardOneOffer";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import { getOfferByUserId } from "@/data/offer";
import React, { Suspense } from "react";

const DataForOffer = async ({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) => {
  const myId = searchParams?.id;

  const dataForOneOffer = await getOfferByUserId(myId);

  return (
    <div className="mt-5 lg:w-[1024px]">
      <Suspense fallback={<CardsSkeleton />}>
        <CardOneOffer dataForOneOffer={dataForOneOffer} />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
