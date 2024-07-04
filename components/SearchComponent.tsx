import { getDataWithSearchParams, totalDataProps } from "@/lib/data";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import Card from "./Card";

interface searchComponentsProps {
  data: totalDataProps;
}

const SearchComponent = async ({ data }: searchComponentsProps) => {
  return (
    <div className="w-[95%] flex flex-col items-center gap-4 mt-5">
      {data?.map((value, index) => (
        <Fragment key={index}>
          <Card mycarData={value} />
        </Fragment>
      ))}
    </div>
  );
};

export default SearchComponent;
