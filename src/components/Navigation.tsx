'use client'

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";

import { NavButton } from "./NavButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
    {
        href: "/",
        label: "Visão Geral"
    },
    {
        href: "/transactions",
        label: "Transações"
    },
    {
        href: "/accounts",
        label: "Contas"
    },
    {
        href: "/categories",
        label: "Categorias"
    },
    {
        href: "/settings",
        label: "Configurações"
    },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);

    function onClick(href: string) {
        router.push(href);

        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal text-white bg-white/10 hover:bg-white/20 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition-colors"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}
