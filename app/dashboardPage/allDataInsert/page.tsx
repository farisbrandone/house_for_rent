import { CardsSkeleton } from "@/components/CardsSkeleton";
import DashboardFormData from "@/components/DashboardFormData";
import { getAllOfferByUserId } from "@/data/offer";
import { getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { fetchDataOfferById } from "@/lib/data";
import React, { Suspense } from "react";

const DashBordPage = async () => {
  const user = useCurrentUser();
  const id = user.id;
  const data = await getAllOfferByUserId(id);
  if (data) {
    const at = data[0];
  }

  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardFormData data={data} id={id} />
      </Suspense>
    </div>
  );
};

export default DashBordPage;
