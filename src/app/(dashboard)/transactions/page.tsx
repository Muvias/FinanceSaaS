'use client'

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

import { Loader2Icon, PlusIcon } from "lucide-react";

import { columns } from "./columns";

export default function TransactionsPage() {
    const newTransaction = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    if (transactionsQuery.isLoading) {
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
                        Histórico de Transação
                    </CardTitle>

                    <Button size="sm" onClick={newTransaction.onOpen}>
                        <PlusIcon className="size-4 mr-1" />
                        Adicionar transação
                    </Button>
                </CardHeader>

                <CardContent>
                    {/* <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);

                            deleteTransactions.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    /> */}
                </CardContent>
            </Card>
        </div>
    )
}
