"use client";

import FormDataOffer from "@/components/FormDataOffer";

import React, { Suspense } from "react";
import { useSession } from "next-auth/react";

const DataForOffer = () => {
  //const user = useCurrentUser();
  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  return (
    <Suspense>
      <div className="mt-20">
        <FormDataOffer user={user} />
      </div>
    </Suspense>
  );
};

export default DataForOffer;
