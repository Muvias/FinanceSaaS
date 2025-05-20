import { FileSearchIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AreaVariant } from "./AreaVariant";

interface ChartProps {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

export function Chart({ data = [] }: ChartProps) {
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0">
                <CardTitle className="text-xl line-clamp-1">
                    Transações
                </CardTitle>

                <CardContent>
                    {data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[350px] w-full gap-y-4">
                            <FileSearchIcon className="size-6 text-muted-foreground" />

                            <p className="text-sm text-muted-foreground">
                                Nenhum dado para este período
                            </p>
                        </div>
                    ) : (
                        <AreaVariant data={data} />
                    )}
                </CardContent>
            </CardHeader>
        </Card>
    )
}
