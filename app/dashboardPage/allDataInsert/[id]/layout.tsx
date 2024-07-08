import Header from "@/components/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "MaMaisonALouer.com",
  description: "Le meilleur site pour la recherche de vos offres immobilières",
  icons: {
    icon: "/vercel.svg",
  },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center top-0 fixed">
        <Header searchOrNot={false} headerForSign={true} />
      </div>
      <div className="flex flex-col flex-1 items-center  min-h-screen ">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
