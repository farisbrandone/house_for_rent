"use client";
import React, { Fragment } from "react";
import Card from "./Card";
import { PaginationPage } from "./Pagination";
import { offerDataParamsWithNull } from "@/actions/createOffer";
import { useIsClient } from "@/hooks/use-is-client";
import Spinner from "./spinner";

/*currentPage={currentPage}
totalPages={totalPages}*/

export interface bodyPageProps {
  currentPage: number;
  totalPages: number;
  data: offerDataParamsWithNull[];
}

const BodyPage = ({ currentPage, totalPages, data }: bodyPageProps) => {
  console.log("copakabana");
  const isClient = useIsClient();
  console.log({ bounga: data[0] });
  if (!isClient) return <Spinner />;
  return (
    <div className="w-[95%] flex flex-col items-center gap-4 mt-5 overflow-y-clip">
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
