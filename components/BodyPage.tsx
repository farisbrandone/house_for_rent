import React, { Fragment } from "react";
import Card from "./Card";
import { getAllData } from "@/lib/data";

const BodyPage = async () => {
  const data = await getAllData(true);
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

export default BodyPage;
