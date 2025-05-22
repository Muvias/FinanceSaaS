import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Skeleton } from "../ui/skeleton";

import { PieVariant } from "./PieVariant";
import { RadarVariant } from "./RadarVariant";
import { RadialVariant } from "./RadialVariant";

import { FileSearchIcon, Loader2Icon, PieChartIcon, RadarIcon, TargetIcon } from "lucide-react";

interface SpendingPieProps {
    data?: {
        name: string;
        value: number;
    }[];
}

export function SpendingPie({ data = [] }: SpendingPieProps) {
    const [chartType, setChartType] = useState<"pie" | "radar" | "radial">("pie");

    function onTypeChange(type: "pie" | "radar" | "radial") {
        setChartType(type);
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0">
                <CardTitle className="text-xl line-clamp-1">
                    Categorias
                </CardTitle>

                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 px-3 rounded-md">
                        <SelectValue placeholder="Tipo de Gráfico" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center">
                                <PieChartIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico de Torta
                                </p>
                            </div>
                        </SelectItem>

                        <SelectItem value="radar">
                            <div className="flex items-center">
                                <RadarIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico de Radar
                                </p>
                            </div>
                        </SelectItem>

                        <SelectItem value="radial">
                            <div className="flex items-center">
                                <TargetIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico Circular
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[350px] w-full gap-y-4">
                        <FileSearchIcon className="size-6 text-muted-foreground" />

                        <p className="text-sm text-muted-foreground">
                            Nenhum dado para este período
                        </p>
                    </div>
                ) : (
                    <>
                        {chartType === "pie" && <PieVariant data={data} />}
                        {chartType === "radar" && <RadarVariant data={data} />}
                        {chartType === "radial" && <RadialVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export function SpendingPieLoading() {
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-full lg:w-[120px]" />
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-center h-[350px] w-full">
                    <Loader2Icon className="h-6 w-6 text-slate-300 animate-spin" />
                </div>
            </CardContent>
        </Card>
    )
}
