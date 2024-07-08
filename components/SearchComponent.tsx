import { totalDataProps } from "@/lib/data";
import React, { Fragment } from "react";
import Card from "./Card";
import { PaginationPage } from "./Pagination";
import { offerDataParamsWithNull } from "@/actions/createOffer";

interface searchComponentsProps {
  data: offerDataParamsWithNull[];
  totalPages: number;
}

const SearchComponent = async ({ data, totalPages }: searchComponentsProps) => {
  return (
    <>
      <div className="w-[95%] flex flex-col items-center gap-4 mt-5">
        {data?.map((value, index) => (
          <Fragment key={index}>
            <Card mycarData={value} />
          </Fragment>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <PaginationPage totalPages={totalPages} />
      </div>
    </>
  );
};

export default SearchComponent;
