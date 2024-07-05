import { CardsSkeleton } from "@/components/CardsSkeleton";
import SearchComponent from "@/components/SearchComponent";
import { getDataWithSearchParams } from "@/lib/data";
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

  const data = await getDataWithSearchParams(
    valueOfPays,
    valueOfVille,
    valueOfTypeOffre
  );
  return (
    <div>
      <div>
        <Suspense fallback={<CardsSkeleton />}>
          <SearchComponent data={data} />
        </Suspense>
      </div>
    </div>
  );
};

export default SeachPage;
