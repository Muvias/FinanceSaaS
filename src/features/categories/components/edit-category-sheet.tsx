import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCategory } from "../api/use-delete-category";
import { useEditCategory } from "../api/use-edit-category";
import { useGetCategory } from "../api/use-get-category";
import { useOpenCategory } from "../hooks/use-open-category";

import { CategoryForm } from "./category-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Loader2Icon } from "lucide-react";

const formSchema = insertCategorySchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

export function EditCategorySheet() {
    const { id, isOpen, onClose } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você está prestes a deletar essa categoria, esta ação não poderá ser desfeita"
    )

    const categoryQuery = useGetCategory(id);

    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;

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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
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
                            Editar Categoria
                        </SheetTitle>

                        <SheetDescription>
                            Edite as informações da sua categoria aqui.
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <CategoryForm
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
