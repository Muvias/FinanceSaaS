import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";

import { useGetAccount } from "../api/use-get-account";
import { useOpenAccount } from "../hooks/use-open-account";

import { AccountForm } from "./account-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Loader2Icon } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";

const formSchema = insertAccountSchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

export function EditAccountSheet() {
    const { id, isOpen, onClose } = useOpenAccount();

    const accountQuery = useGetAccount(id);

    const editMutation = useEditAccount(id);

    const isPending = editMutation.isPending;
    const isLoading = accountQuery.isLoading;

    function onSubmit(values: FormValues) {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: ""
    };

    return (
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
                    />
                )}
            </SheetContent>
        </Sheet>
    )
}
