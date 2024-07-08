import { CardsSkeleton } from "@/components/CardsSkeleton";
import FormDataOffer from "@/components/FormDataOffer";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { Suspense } from "react";

const DataForOffer = () => {
  const user = useCurrentUser();
  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <FormDataOffer user={user} />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
