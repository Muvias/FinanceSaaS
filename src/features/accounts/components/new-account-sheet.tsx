import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";

import { useCreateAccount } from "../api/use-create-account";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const formSchema = insertAccountSchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

export function NewAccountSheet() {
    const { isOpen, onClose } = useNewAccount();

    const createAccount = useCreateAccount();

    function onSubmit(values: FormValues) {
        createAccount.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nova Conta
                    </SheetTitle>

                    <SheetDescription>
                        Crie uma nova conta para acompanhar suas transações.
                    </SheetDescription>
                </SheetHeader>

                <AccountForm onSubmit={onSubmit} disabled={createAccount.isPending} defaultValues={{ name: "" }} />
            </SheetContent>
        </Sheet>
    )
}
