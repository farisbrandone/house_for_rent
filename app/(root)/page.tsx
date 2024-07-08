import BodyPage from "@/components/BodyPage";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import { getAllOffer, getTotalOffer } from "@/data/offer";
import { fetchTotalData } from "@/lib/data";
import React, { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  getAllOffer;

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalOffer();
  const data = await getAllOffer(currentPage);
  if (!data || !totalPages) {
    return <CardsSkeleton />;
  }
  return (
    <div className="lg:w-[1024px] flex items-center justify-center ">
      <Suspense fallback={<CardsSkeleton />}>
        <BodyPage
          currentPage={currentPage}
          totalPages={totalPages}
          data={data}
        />
      </Suspense>
    </div>
  );
};

export default Home;
