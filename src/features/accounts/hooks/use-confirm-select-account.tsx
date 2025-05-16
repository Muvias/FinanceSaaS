import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useCreateAccount } from "../api/use-create-account";
import { useGetAccounts } from "../api/use-get-accounts";
import { Select } from "@/components/select";

export const useConfirmSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }));

    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);

    const selectValue = useRef<string>();

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    function handleClose() {
        setPromise(null);
    };

    function handleConfirm() {
        promise?.resolve(selectValue.current);

        handleClose();
    };

    function handleCancel() {
        promise?.resolve(undefined);

        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Selecionar Conta
                    </DialogTitle>

                    <DialogDescription>
                        Por favor selecione uma conta para continuar
                    </DialogDescription>
                </DialogHeader>

                <Select
                    placeholder="Selecione uma conta"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => selectValue.current = value}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />

                <DialogFooter className="pt-2">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
}
