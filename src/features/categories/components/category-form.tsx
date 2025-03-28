import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TrashIcon } from "lucide-react";

const formSchema = insertCategorySchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

interface CategoryFormProps {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export function CategoryForm({ id, defaultValues, onDelete, onSubmit, disabled }: CategoryFormProps) {
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
                                    placeholder="Ex. Comida, Viagem, etc."
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
                    {id ? "Salvar mudanças" : "Criar categoria"}
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

                        Deletar Categoria
                    </Button>
                )}
            </form>
        </Form>
    )
}


