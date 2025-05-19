'use client'

import { useSearchParams } from "next/navigation";

import { formatDateRange } from "@/lib/utils";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { DataCard, DataCardLoading } from "./DataCard";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export function DataGrid() {
    const { data, isLoading } = useGetSummary();

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const dateRangeLabel = formatDateRange({ to, from });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
                title="Restantes"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={PiggyBankIcon}
                variant="default"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Entradas"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={TrendingUpIcon}
                variant="success"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Despesas"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={TrendingDownIcon}
                variant="danger"
                dateRange={dateRangeLabel}
            />
        </div>
    )
}
