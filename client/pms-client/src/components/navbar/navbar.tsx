"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../../components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./../ui/navigation-menu";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./../ui/menubar";

import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { RootState, store, useSelector } from "../../redux/store";

type Props = {};

export default function Navbar({}: Props) {
  const pathname = usePathname();
  const [noNav, setNoNav] = useState(false);

  const { user } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const isLoginORregisterPath =
      pathname === "/login" || pathname === "/register";
    setNoNav(isLoginORregisterPath);
  }, [pathname]);

  return (
    <nav
      className={`h-[10vh] w-screen border-b px-10 ${
        noNav ? "hidden" : "flex items-center justify-between"
      }`}
    >
      <div>
        <Image
          src={"/assets/TRIP-2.png"}
          height={100}
          width={100}
          alt="Trip swift logo"
        />
      </div>
      <div className="flex gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-1 space-y-2">
                  <Link
                    href={`/property?token=${
                      store.getState().authReducer.accessToken
                    }`}
                  >
                    <Button variant={"ghost"}>Manage Properties</Button>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcnn.png" />
                <AvatarFallback>
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>Ritesh</p>
            </MenubarTrigger>
            <MenubarContent className="">
              <Link href={"http://localhost:3000/profile"}>
                <MenubarItem>
                  Profile
                  <MenubarShortcut>
                    <User size={20} />
                  </MenubarShortcut>{" "}
                </MenubarItem>
              </Link>
              <MenubarItem>
                Settings
                <MenubarShortcut>
                  <Settings size={20} />
                </MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 list-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
