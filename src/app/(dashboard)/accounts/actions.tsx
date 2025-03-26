"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import { EditIcon, EllipsisVerticalIcon } from "lucide-react";

interface ActionsProps {
    id: string;
}

export function Actions({ id }: ActionsProps) {
    const { onOpen } = useOpenAccount();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="size-8 p-0"
                >
                    <EllipsisVerticalIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    disabled={false}
                    onClick={() => onOpen(id)}
                >
                    <EditIcon className="size-4" />

                    Editar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}