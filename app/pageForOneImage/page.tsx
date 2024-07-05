import CardOneOffer from "@/components/CardOneOffer";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import React, { Suspense } from "react";

const DataForOffer = () => {
  return (
    <div className="mt-20 lg:w-[1024px]">
      <Suspense fallback={<CardsSkeleton />}>
        <CardOneOffer />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
