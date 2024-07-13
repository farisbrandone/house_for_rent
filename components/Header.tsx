"use client";

import React from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { ButtonMenu } from "./ButtonMenu";
import SelectMenuPays from "./SelectMenuPays";
import SelectMenuVille from "./SelectMenuVille";
import { useMobileStore } from "@/store/mobile-navbar";
import { MobileMenu } from "./MobileMenu";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import SelectMenuOffre from "./SelectMenuOffre";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const Header = ({
  searchOrNot,
  headerForSign,
}: {
  searchOrNot: boolean;
  headerForSign: boolean;
}) => {
  const {
    collapsed,
    value,
    payss,
    ville,
    offre,
    modifyPays,
    modifyVille,
    modifyOffre,
    onExpand,
    onCollapse,
  } = useMobileStore((state) => state);
  const matches = useMediaQuery("(max-width:624px)");
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);
  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const seachClick = () => {
    console.log({ payss, ville, offre });
    const params = new URLSearchParams(searchParams);
    !!payss && params.set("pays", payss);
    !!ville && params.set("ville", ville);
    !!offre && params.set("type_offre", offre);
    const truePathname = pathname === "/" ? "/search" : pathname;

    router.push(`${truePathname}?${params.toString()}`);
  };

  return (
    <div className="lg:w-[1024px] flex flex-col items-center">
      <header className="flex justify-between w-full px-2">
        <Logo />

        {!collapsed && !headerForSign && !user && (
          <div className="flex flex-row items-center gap-4">
            <Button
              variant="inerte"
              onClick={() => router.push("/dashboardPage")}
            >
              Inserer une offre
            </Button>
            <Button
              variant="button1"
              onClick={() => router.push("/auth/register")}
            >
              S&apos;inscrire
            </Button>
            <Button
              variant="button2"
              onClick={() => router.push("/auth/login")}
            >
              Se connecter
            </Button>
          </div>
        )}
        {!collapsed && !headerForSign && !!user && (
          <div className="flex flex-row items-center gap-4">
            <Button
              variant="inerte"
              onClick={() => router.push("/dashboardPage")}
            >
              Inserer une offre
            </Button>
            <Button
              variant="button2"
              onClick={async () => {
                console.log("logout");
                await logout();
                router.push("/");
                router.refresh();
              }}
            >
              Se deconnecter
            </Button>
          </div>
        )}
        {collapsed && !headerForSign && (
          <div>
            <MobileMenu />
          </div>
        )}
      </header>
      {!headerForSign && (
        <nav className="flex flex-row mt-2 items-center w-screen md:w-full">
          <ButtonMenu value="Chambre" />
        </nav>
      )}
      {searchOrNot && !headerForSign && (
        <div className="flex flex-col w-full mt-8 pl-1">
          <p className="text-5xl font-bold brightness-90 text-white text-left">
            Trouver votre prochain bien d&apos;habitation ici
          </p>
          <p className="text-xl text-white font-normal text-wrap">
            Rechercher des Chambres, des Studios, des Appartements, des Terrains
            etc... ou que vous soyez
          </p>
        </div>
      )}

      {!headerForSign && (
        <div className="mt-4 flex flex-col w-full border-2 border-[#ffb700] bg-[#ffb700] rounded-sm p-0 md:flex-row">
          <SelectMenuOffre />
          <SelectMenuPays />
          <SelectMenuVille pays={value} />
          <Button
            className="bg-[#006ce4] text-white text-xl cursor-pointer ml-1 hover:bg-[#006ce4]/95"
            onClick={seachClick}
          >
            Rechercher
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
