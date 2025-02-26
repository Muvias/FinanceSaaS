import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Loader2 } from "lucide-react";

import { HeaderLogo } from "./HeaderLogo";
import { Navigation } from "./Navigation";

export function Header() {
    return (
        <div className="px-4 lg:px-14 py-8 lg:pb-36 bg-gradient-to-b from-blue-700 to-blue-500">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between w-full mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />

                        <Navigation />
                    </div>

                    <ClerkLoading>
                        <Loader2 className="size-6 animate-spin text-white/80"/>
                    </ClerkLoading>

                    <ClerkLoaded>
                        <UserButton />
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    )
}
