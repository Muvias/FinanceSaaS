import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";

import { useCreateCategory } from "../api/use-create-category";
import { useNewCategory } from "../hooks/use-new-category";

import { CategoryForm } from "./category-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const formSchema = insertCategorySchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>

export function NewCategorySheet() {
    const { isOpen, onClose } = useNewCategory();

    const createCategory = useCreateCategory();

    function onSubmit(values: FormValues) {
        createCategory.mutate(values, {
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
                        Nova Categoria
                    </SheetTitle>

                    <SheetDescription>
                        Crie uma nova categoria para organizar suas transações.
                    </SheetDescription>
                </SheetHeader>

                <CategoryForm onSubmit={onSubmit} disabled={createCategory.isPending} defaultValues={{ name: "" }} />
            </SheetContent>
        </Sheet>
    )
}
