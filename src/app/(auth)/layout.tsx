import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="lg:flex flex-col items-center justify-center h-full px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Bem-vindo de volta!
                    </h1>

                    <p className="text-base text-muted-foreground">
                        Faça login ou crie uma nova conta para voltar ao seu dashboard.
                    </p>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <ClerkLoading>
                        <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    </ClerkLoading>

                    <ClerkLoaded>
                        {children}
                    </ClerkLoaded>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center h-full bg-blue-600">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    height={100}
                    width={100}
                />
            </div>
        </div>
    );
}
