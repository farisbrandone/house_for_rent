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
import { useSession } from "next-auth/react";

export function MobileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-2">
        <Button variant="outline" className=" text-white bg-transparent">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboardPage")}>
            <User className="mr-2 h-4 w-4" />
            <span>Inserer une offre</span>
          </DropdownMenuItem>
          {!user && (
            <div>
              <DropdownMenuItem onClick={() => router.push("/auth/register")}>
                <User className="mr-2 h-4 w-4" />
                <span>S&apos;inscrire</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                <User className="mr-2 h-4 w-4" />
                <span>Se connecter</span>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
        {!!user && (
          <DropdownMenuItem>
            <LogOut
              className="mr-2 h-4 w-4"
              onClick={() => {
                logout();
                router.push("/");
                router.refresh();
              }}
            />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
