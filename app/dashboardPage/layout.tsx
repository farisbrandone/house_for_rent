import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MaMaisonALouer.com",
  description: "Le meilleur site pour la recherche de vos offres immobilières",
  icons: {
    icon: "/vercel.svg",
  },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="">
        <div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center">
          <Header searchOrNot={false} headerForSign={true} />
        </div>
        <div className="flex flex-col items-center justify-center  min-h-screen ">
          <Suspense>{children}</Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
};

export default AppLayout;
