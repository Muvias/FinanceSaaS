import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";

export function CustomTooltip({ active, payload }: any) {
    if (!active) return null;

    const date = payload[0].payload.date;
    const income = payload[0].value;
    const expenses = payload[1].value;

    return (
        <div className="rounded-sm border overflow-hidden bg-white">
            <div className="py-2 px-3 text-sm text-muted-foreground bg-muted">
                {format(date, "dd MMM, yyyy")}
            </div>

            <Separator />

            <div className="py-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 rounded-full bg-blue-500" />

                        <p className="text-sm text-muted-foreground">
                            Saldos
                        </p>
                    </div>

                    <p className="text-sm text-right font-medium">
                        {formatCurrency(income)}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 rounded-full bg-rose-500" />

                        <p className="text-sm text-muted-foreground">
                            Gastos
                        </p>
                    </div>

                    <p className="text-sm text-right font-medium">
                        {formatCurrency(expenses)}
                    </p>
                </div>
            </div>
        </div>
    )
}
