import { z } from "zod";

import { insertTransactionSchema } from "@/db/schema";

import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTransaction } from "../hooks/use-open-transaction";

import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { TransactionForm } from "./transaction-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";
import { Loader2Icon } from "lucide-react";

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

    const categoryMutation = useCreateCategory();
    const categoryQuery = useGetCategories();
    const onCreateCategory = (name: string) => categoryMutation.mutate({
        name
    });
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id
    }));

    const accountMutation = useCreateAccount();
    const accountQuery = useGetAccounts();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }));

    const isPending = editMutation.isPending || deleteMutation.isPending || transactionQuery.isPending || categoryMutation.isPending || accountMutation.isPending;
    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading;

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
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
            ? new Date(transactionQuery.data.date)
            : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
    } : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: ""
    };

    return (
        <>
            <ConfirmDialog />

            <Sheet open={isOpen} onOpenChange={onClose}>

                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar Transação
                        </SheetTitle>

                        <SheetDescription>
                            Edite uma transação existente.
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <TransactionForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                            onDelete={onDelete}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
