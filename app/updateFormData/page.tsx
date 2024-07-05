import { CardsSkeleton } from "@/components/CardsSkeleton";
import UpdateFormData from "@/components/UpdateFormData";
import React, { Suspense } from "react";

const DataForOffer = () => {
  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <UpdateFormData />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
