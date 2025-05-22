"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

import qs from "query-string";

export function AccountFilter() {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
    const { isLoading: isLoadingSummary } = useGetSummary();

    function onChange(newValue: string) {
        const query = {
            accountId: newValue,
            from,
            to
        };

        if (newValue === "all") {
            query.accountId = "";
        };

        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }

    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts || isLoadingSummary}
        >
            <SelectTrigger className="w-full lg:w-auto h-9 px-3 rounded-md border-none font-normal text-white bg-white/10 hover:bg-white/20 hover:text-white focus:ring-offset-0 focus:ring-transparent focus:bg-white/30 data-[placeholder]:text-white outline-none transition">
                <SelectValue placeholder="Selecionar conta" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">
                    Todas as contas
                </SelectItem>

                {accounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
