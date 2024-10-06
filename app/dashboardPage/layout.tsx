import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";
import Script from 'next/script'

export const metadata: Metadata = {
  title: "MaMaisonALouer.com",
  description:
    "MaMaisonAlouer.com, le site de référence pour la recherche des offres immobilières et le lieux indiqués pour poster ces offres immobilières",
  icons: {
    icon: "/vercel.svg",
  },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
       < Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9175852038588591"
     crossOrigin="anonymous" strategy="afterInteractive" />
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
