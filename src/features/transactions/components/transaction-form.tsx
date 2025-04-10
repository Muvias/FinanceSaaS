import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertTransactionSchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TrashIcon } from "lucide-react";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
});

const apiSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>

interface TransactionFormProps {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string, value: string }[];
    categoryOptions: { label: string, value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
}

export function TransactionForm({ id, defaultValues, accountOptions, categoryOptions, onCreateAccount, onCreateCategory, onDelete, onSubmit, disabled }: TransactionFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    function handleSubmit(values: FormValues) {
        console.log(values);
        // onSubmit(values);
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
                    name="accountId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Conta
                            </FormLabel>

                            <FormControl>
                                <Select
                                    placeholder="Selecione uma conta"
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Categoria
                            </FormLabel>

                            <FormControl>
                                <Select
                                    placeholder="Selecione uma categoria"
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="payee"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Beneficiário
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Adicionar um Beneficiário"
                                    disabled={disabled}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full"
                    disabled={disabled}
                >
                    {id ? "Salvar mudanças" : "Criar transação"}
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

                        Deletar
                    </Button>
                )}
            </form>
        </Form>
    )
}


