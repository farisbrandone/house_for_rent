import { CardsSkeleton } from "@/components/CardsSkeleton";
import DashboardFormData from "@/components/DashboardFormData";
import React, { Suspense } from "react";

const DashBordPage = () => {
  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardFormData />
      </Suspense>
    </div>
  );
};

export default DashBordPage;
