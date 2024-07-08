import { CardsSkeleton } from "@/components/CardsSkeleton";
import UpdateFormData from "@/components/UpdateFormData";
import { fetchDataOfferById } from "@/lib/data";
import React, { Suspense } from "react";

const DataForOffer = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await fetchDataOfferById(id);

  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <UpdateFormData data={data} />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
