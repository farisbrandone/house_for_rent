import { CardsSkeleton } from "@/components/CardsSkeleton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MaMaisonALouer.com",
  description:
    "Studio, chambre et Appartement à louer disponible sur mamaisonalouer.com",
  icons: {
    icon: "/vercel.svg",
  },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div>
        <div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center mt-0">
          <Header searchOrNot={false} headerForSign={false} />
        </div>
        <div className="flex items-center justify-center w-full">
          <Suspense fallback={<CardsSkeleton />}>{children}</Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
};

export default AppLayout;
