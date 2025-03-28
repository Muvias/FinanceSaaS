"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useConfirm } from "@/hooks/use-confirm";

import { EditIcon, EllipsisVerticalIcon, TrashIcon } from "lucide-react";

interface ActionsProps {
    id: string;
}

export function Actions({ id }: ActionsProps) {
    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você está prestes a deletar essa categoria, esta ação não poderá ser desfeita"
    )

    const { onOpen } = useOpenCategory();
    const deleteMutation = useDeleteCategory(id);

    async function onDelete() {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        };
    }

    return (
        <>
            <ConfirmDialog />

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
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <EditIcon className="size-4" />

                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={onDelete}
                    >
                        <TrashIcon className="size-4" />

                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}