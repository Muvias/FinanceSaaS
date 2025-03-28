'use client'

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

import { Loader2Icon, PlusIcon } from "lucide-react";

import { columns } from "./columns";

export default function Categories() {
    const newCategory = useNewCategory();
    const deleteCategories = useBulkDeleteCategories();
    const categoriesQuery = useGetCategories();
    const categories = categoriesQuery.data || [];

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if (categoriesQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>

                    <CardContent className="h-[500px] w-full flex items-center justify-center">
                        <Loader2Icon className="size-6 text-slate-300 animate-spin" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categorias
                    </CardTitle>

                    <Button size="sm" onClick={newCategory.onOpen}>
                        <PlusIcon className="size-4 mr-1" />
                        Adicionar nova
                    </Button>
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={columns}
                        data={categories}
                        filterKey="email"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);

                            deleteCategories.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
