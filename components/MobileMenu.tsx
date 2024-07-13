"use client";
import { AlignJustify, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

export function MobileMenu() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-2">
        <Button variant="outline" className=" text-white bg-transparent">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboardPage")}>
            <User className="mr-2 h-4 w-4" />
            <span>Inserer une offre</span>
            <DropdownMenuShortcut>⇧⌘I</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/auth/register")}>
            <User className="mr-2 h-4 w-4" />
            <span>S&apos;inscrire</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/auth/login")}>
            <User className="mr-2 h-4 w-4" />
            <span>Se connecter</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <LogOut
            className="mr-2 h-4 w-4"
            onClick={() => {
              logout();
            }}
          />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
