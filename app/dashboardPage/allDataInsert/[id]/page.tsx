import { CardsSkeleton } from "@/components/CardsSkeleton";
import UpdateFormData from "@/components/UpdateFormData";
import { getOfferByUserId } from "@/data/offer";
import React, { Suspense } from "react";

const DataForOffer = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    userId: string;
  };
}) => {
  const id = params.id;
  const data = await getOfferByUserId(id);
  const userId = searchParams?.userId;

  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <UpdateFormData data={data} userId={userId} />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
