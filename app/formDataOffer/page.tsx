import { CardsSkeleton } from "@/components/CardsSkeleton";
import FormDataOffer from "@/components/FormDataOffer";
import React, { Suspense } from "react";

const DataForOffer = () => {
  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <FormDataOffer />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
