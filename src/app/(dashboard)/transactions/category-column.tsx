import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";

interface CategoryColumnProps {
    id: string;
    category: string | null;
    categoryId: string | null;
}

export function CategoryColumn({ id, category, categoryId }: CategoryColumnProps) {
    const { onOpen: onOpenCategory } = useOpenCategory();

    function onClick() {
        if (categoryId) {
            onOpenCategory(categoryId);
        }
    };

    return (
        <div
            className={cn("flex items-center cursor-pointer hover:underline underline-offset-2",
                !category && "text-rose-500"
            )}
            onClick={onClick}
        >
            {!category && <TriangleAlertIcon className="size-4 mr-2 shrink-0" />}
            {category || "Sem categoria"}
        </div>
    )
}
