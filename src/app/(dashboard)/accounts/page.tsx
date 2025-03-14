'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { PlusIcon } from "lucide-react";

export default function Accounts() {
    const newAccount = useNewAccount();

    return (
        <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Contas
                    </CardTitle>

                    <Button size="sm" onClick={newAccount.onOpen}>
                        <PlusIcon className="size-4 mr-1" />
                        Adicionar conta
                    </Button>
                </CardHeader>
            </Card>
        </div>
    )
}
