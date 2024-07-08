import React, { Fragment } from "react";
import Card from "./Card";
import { fetchDataOffer, getAllData } from "@/lib/data";
import { PaginationPage } from "./Pagination";
import { offerDataParamsWithNull } from "@/actions/createOffer";

/*currentPage={currentPage}
totalPages={totalPages}*/

export interface bodyPageProps {
  currentPage: number;
  totalPages: number;
  data: offerDataParamsWithNull[];
}

const BodyPage = async ({ currentPage, totalPages, data }: bodyPageProps) => {
  return (
    <div className="w-[95%] flex flex-col items-center gap-4 mt-5">
      {data?.map((value, index) => (
        <Fragment key={index}>
          <Card mycarData={value} />
        </Fragment>
      ))}
      <div className="mt-5 flex w-full justify-center">
        <PaginationPage totalPages={totalPages} />
      </div>
    </div>
  );
};

export default BodyPage;
