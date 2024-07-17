"use client";

import { offerDataParamsWithNull } from "@/actions/createOffer";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useIsClient } from "@/hooks/use-is-client";
import Spinner from "./spinner";

interface cardProps {
  mycarData: offerDataParamsWithNull;
}

const Card = ({ mycarData }: cardProps) => {
  const isClient = useIsClient();

  const router = useRouter();
  const goToOnePage = (id: string) => {
    router.push(`/pageForOneImage?id=${id}`);
  };
  if (!isClient) return <Spinner />;
  return (
    <div
      className=" w-full mt-2 flex items-center justify-center shadow-lg"
      onClick={() => goToOnePage(mycarData.id)}
    >
      <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
        <div className="relative w-[90%]  h-[250px] bg-transparent md:w-[250px] md:h-[200px]">
          <div className="flex items-center justify-center absolute top-1 right-1 rounded-full bg-white brightness-200 w-[25px] h-[25px] p-1">
            <Heart className="w-full h-full" />
          </div>
          <Image
            src={mycarData.imageOffre[0]}
            alt="First Image"
            width={250}
            height={200}
            className="rounded-lg w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center flex-1 md:h-[200px]">
          <h1 className="text-[#006ce4] text-xl  md:text-2xl font-bold text-wrap">
            {mycarData.nomOffre}
          </h1>
          <h6 className="text-[#006ce4] text-start text-sm font-bold underline">
            {mycarData.paysOffre}- {mycarData.villeOffre}
          </h6>
          {
            <div className="text-[#1a1a1a] text-sm text-wrap break-words whitespace-break-spaces overflow-hidden ">
              {mycarData.descriptifOffre}
            </div>
          }
        </div>
        <div className="md:h-[200px] flex justify-center items-center max-[768px]:w-full max-[768px]:mb-5">
          <button className="p-2 flex items-center justify-center bg-[#006ce4] text-white text-sm hover:bg-[#003b95] w-[90%] md:w-[100px] h-[50px] rounded-lg max-[768px]:text-lg">
            Afficher les détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
