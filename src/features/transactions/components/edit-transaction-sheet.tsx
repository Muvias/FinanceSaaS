import { z } from "zod";

import { insertTransactionSchema } from "@/db/schema";

import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTransaction } from "../hooks/use-open-transaction";

import { AccountForm } from "./account-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Loader2Icon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertTransactionSchema.omit({
    id: true
});

type FormValues = z.input<typeof formSchema>

export function EditTransactionSheet() {
    const { id, isOpen, onClose } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você está prestes a deletar essa transação, esta ação não poderá ser desfeita"
    )

    const transactionQuery = useGetTransaction(id);

    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = transactionQuery.isLoading;

    function onSubmit(values: FormValues) {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    async function onDelete() {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        };
    }

    const defaultValues = transactionQuery.data ? {
        name: transactionQuery.data.name
    } : {
        name: ""
    };

    return (
        <>
            <ConfirmDialog />

            <Sheet open={isOpen} onOpenChange={onClose}>

                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar Conta
                        </SheetTitle>

                        <SheetDescription>
                            Edite as informações da sua conta aqui.
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
