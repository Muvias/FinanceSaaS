"use client"

import { format, subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";


import { Button } from "./ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover";

import { formatDateRange } from "@/lib/utils";

import { ChevronDown } from "lucide-react";
import qs from "query-string";
import { Calendar } from "./ui/calendar";

interface DateFilterProps { }

export function DateFilter({ }: DateFilterProps) {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo
    };

    const [date, setDate] = useState<DateRange | undefined>(paramState);

    function pushToUrl(dateRange: DateRange | undefined) {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId
        };

        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }

    function onReset() {
        setDate(undefined);
        pushToUrl(undefined);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={false}
                    className="w-full lg:w-auto h-9 px-3 rounded-md border-none font-normal text-white bg-white/10 hover:bg-white/20 hover:text-white focus:ring-offset-0 focus:ring-transparent focus:bg-white/30 data-[placeholder]:text-white outline-none transition"
                >
                    <span>
                        {formatDateRange(paramState)}
                    </span>

                    <ChevronDown className="size-4 ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full lg:w-auto p-0" align="start">
                <Calendar
                    defaultMonth={date?.from}
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    initialFocus
                    disabled={false}
                />

                <div className="flex items-center w-full p-4 gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            variant="outline"
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Resetar
                        </Button>
                    </PopoverClose>

                    <PopoverClose asChild>
                        <Button
                            onClick={() => pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Aplicar
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}
