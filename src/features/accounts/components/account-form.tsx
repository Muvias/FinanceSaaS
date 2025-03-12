import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TrashIcon } from "lucide-react";

const formSchema = insertAccountSchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

interface AccountFormProps {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export function AccountForm({ id, defaultValues, onDelete, onSubmit, disabled }: AccountFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    function handleSubmit(values: FormValues) {
        onSubmit(values);
    }

    function handleDelete() {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nome
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Ex. Dinheiro, Banco, Cartão de Crédito"
                                    disabled={disabled}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full"
                    disabled={disabled}
                >
                    {id ? "Salvar mudanças" : "Criar conta"}
                </Button>

                {!!id && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleDelete}
                        disabled={disabled}
                        className="w-full"
                    >
                        <TrashIcon className="size-4 mr-1.5" />

                        Deletar Conta
                    </Button>
                )}
            </form>
        </Form>
    )
}


