import { formatCurrency } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function CategoryTooltip({ active, payload }: any) {
    if (!active) return null;

    const name = payload[0].payload.name;
    const value = payload[0].value;

    return (
        <div className="rounded-sm border overflow-hidden bg-white">
            <div className="py-2 px-3 text-sm text-muted-foreground bg-muted">
                {name}
            </div>

            <Separator />

            <div className="py-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 rounded-full bg-rose-500" />

                        <p className="text-sm text-muted-foreground">
                            Gastos
                        </p>
                    </div>

                    <p className="text-sm text-right font-medium">
                        {formatCurrency(value)}
                    </p>
                </div>
            </div>
        </div>
    )
}
