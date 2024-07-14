"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";

const DataForOffer = () => {
  //const user = useCurrentUser();
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  return (
    <Suspense>
      <div className=" flex flex-col items-center justify-center sm:w-[650px] w-[90%]  rounded-lg shadow-black border-4 shadow-xl">
        <div className=" flex flex-col gap-8 w-full p-6">
          <Button
            className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded-full border border-blue-500 shadow-md transition duration-300 ease-in-out transform hover:scale-105 p-7 text-2xl"
            onClick={() => router.push("/dashboardPage/InsertData")}
          >
            Inserer une offre{" "}
            <span className="ml-2 animate-bounce  text-white brightness-150">
              <ArrowRightFromLine />
            </span>
          </Button>
          <Button
            className="bg-gray-700 hover:bg-gray-900 mt-5 text-white font-bold py-2 px-4 rounded-full border border-gray-700 shadow-md transition duration-300 ease-in-out transform hover:scale-105 p-7 text-2xl"
            onClick={() =>
              router.push(`/dashboardPage/allDataInsert?id=${user.id}`)
            }
          >
            Acceder à vos offres{" "}
            <span className="ml-2 animate-bounce   text-white brightness-150 ">
              <ArrowRightFromLine />
            </span>
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default DataForOffer;
