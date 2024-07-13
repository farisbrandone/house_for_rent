import Footer from "@/components/Footer";
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
    <div>
      {/*<div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center mt-0">
        <Header searchOrNot={false} headerForSign={true} />
  </div>*/}
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
