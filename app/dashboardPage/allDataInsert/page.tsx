import DashboardFormData from "@/components/DashboardFormData";
import { getAllOfferByUserId } from "@/data/offer";
import React, { Suspense } from "react";

const DashBordPage = async ({
  searchParams,
}: {
  searchParams?: {
    id?: string;
    success?: string;
  };
}) => {
  const id = searchParams?.id;
  const success = searchParams?.success;
  const data = await getAllOfferByUserId(id);
  console.log({ id });
  if (data) {
    const at = data[0];
  }
  if (!id) {
    throw new Error("une ereur est survenu pendant le processus de traitement");
  }

  return (
    <div className="mt-3">
      <DashboardFormData data={data} id={id} success={success} />
    </div>
  );
};

export default DashBordPage;
