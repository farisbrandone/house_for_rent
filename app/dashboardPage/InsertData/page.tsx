"use client";
import { CardsSkeleton } from "@/components/CardsSkeleton";
import FormDataOffer from "@/components/FormDataOffer";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { Suspense } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const DataForOffer = () => {
  //const user = useCurrentUser();
  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  return (
    <div className="mt-20">
      <Suspense fallback={<CardsSkeleton />}>
        <FormDataOffer user={user} />
      </Suspense>
    </div>
  );
};

export default DataForOffer;
