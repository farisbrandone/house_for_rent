"use client";

import * as React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { typeOffer } from "@/data/dataTypeOffer";
import { BedDouble, Castle, Landmark, School } from "lucide-react";
import { useMobileStore } from "@/store/mobile-navbar";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface buttonMenuProps {
  value: string;
}

export function ButtonMenu({ value }: buttonMenuProps) {
  const { collapsed, onExpand, onCollapse } = useMobileStore((state) => state);
  const matches = useMediaQuery("(max-width:624px)");
  React.useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("type_offre", term);
    const truePathname = pathname === "/" ? "/search" : pathname;

    router.push(`${truePathname}?${params.toString()}`);
  };

  return (
    <Menubar
      className={cn(
        " text-white w-screen md:w-full border-0 bg-transparent flex items-center justify-center",
        collapsed && "overflow-auto pl-40"
      )}
    >
      <MenubarMenu value="">
        <MenubarTrigger>
          <span className="mr-2">
            <BedDouble />
          </span>
          Chambre
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Chambre simple");
            }}
          >
            Simple <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Moderne</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                onSelect={(e) => {
                  handleClick("Chambre moderne meublée");
                }}
              >
                Meublée
              </MenubarItem>
              <MenubarItem
                onSelect={(e) => {
                  handleClick("Chambre moderne non meublée");
                }}
              >
                Non meublée
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem
            onSelect={(e) => {
              handleClick("Chambre d'hôtel");
            }}
          >
            D&apos;h&ocirc;tel <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <span className="mr-2">
            <School />
          </span>
          Studio
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Studio simple");
            }}
          >
            Simple <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>

          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Moderne</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                onSelect={(e) => {
                  handleClick("Studio moderne meublé");
                }}
              >
                Meublée
              </MenubarItem>
              <MenubarItem
                onSelect={(e) => {
                  handleClick("Studio moderne non meublé");
                }}
              >
                Non meublée
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <span className="mr-2">
            <Castle />
          </span>{" "}
          Appartement
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Appartement meublé");
            }}
          >
            Meublée
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Appartement non meublé");
            }}
          >
            Non meublée
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {" "}
          <span className="mr-2">
            <Landmark />
          </span>
          Autres
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Villa");
            }}
          >
            Villa<MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Terrain");
            }}
          >
            Terrain<MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Salle de fête");
            }}
          >
            Salle de f&ecirc;te<MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Bureaux");
            }}
          >
            Bureaux<MenubarShortcut>⌘B</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Espace Co-working");
            }}
          >
            Espace Co-working<MenubarShortcut>⌘E</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Boutique");
            }}
          >
            Boutique<MenubarShortcut>⌘BO</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Magasin");
            }}
          >
            Magasin<MenubarShortcut>⌘M</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onSelect={(e) => {
              handleClick("Entrepôt");
            }}
          >
            Entrep&ocirc;t<MenubarShortcut>⌘E</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
