import BodyPage from "@/components/BodyPage";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import React, { Suspense } from "react";

const Home = () => {
  return (
    <div className="lg:w-[1024px] flex items-center justify-center ">
      <Suspense fallback={<CardsSkeleton />}>
        <BodyPage />
      </Suspense>
    </div>
  );
};

export default Home;
