import BodyPage from "@/components/BodyPage";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import { getAllOffer, getTotalOffer } from "@/data/offer";
import React, { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const [data, totalPages] = await Promise.all([
    getAllOffer(currentPage),
    getTotalOffer(),
  ]);
  if (!data || !totalPages) {
    return (
      <div className="lg:w-[1024px] flex items-center justify-center ">
        <CardsSkeleton />
      </div>
    );
  }
  return (
    <Suspense key={totalPages + data.length} fallback={<CardsSkeleton />}>
      <div className="lg:w-[1024px] flex items-center justify-center ">
        <BodyPage
          currentPage={currentPage}
          totalPages={totalPages}
          data={data}
        />
      </div>
    </Suspense>
  );
};

export default Home;
