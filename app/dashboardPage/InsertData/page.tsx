"use client";

import FormDataOffer from "@/components/FormDataOffer";

import React, { Suspense } from "react";
import { useSession } from "next-auth/react";

const DataForOffer = () => {
  //const user = useCurrentUser();
  const { data: session } = useSession();
  console.log("insert1");
  const user = session?.user;
  return (
    <div className="mt-20">
      <FormDataOffer user={user} />
    </div>
  );
};

export default DataForOffer;
