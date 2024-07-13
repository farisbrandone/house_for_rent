import { CardsSkeleton } from "@/components/CardsSkeleton";
import SearchComponent from "@/components/SearchComponent";
import { getSearchOffer, getTotalSearchOffer } from "@/data/offer";
import {
  fetchFilterTotalData,
  fetchFilteredDataOffer,
  getDataWithSearchParams,
} from "@/lib/data";
import React, { Suspense } from "react";

const SeachPage = async ({
  searchParams,
}: {
  searchParams?: {
    pays?: string;
    ville?: string;
    type_offre?: string;
    page?: string;
  };
}) => {
  const valueOfPays = searchParams?.pays;
  const valueOfVille = searchParams?.ville;
  const valueOfTypeOffre = searchParams?.type_offre;
  const pageSearch = searchParams?.page;

  const dataset = await Promise.all([
    getSearchOffer({
      pays: valueOfPays,
      ville: valueOfVille,
      type_offre: valueOfTypeOffre,
      page: pageSearch,
    }),
    getTotalSearchOffer({
      pays: valueOfPays,
      ville: valueOfVille,
      type_offre: valueOfTypeOffre,
      page: pageSearch,
    }),
  ]);

  const data = dataset[0];
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = dataset[1];

  return (
    <div className="lg:w-[1024px] flex items-center justify-center ">
      <Suspense fallback={<CardsSkeleton />}>
        <SearchComponent data={data} totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default SeachPage;
