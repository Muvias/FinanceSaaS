import { useState } from "react";

import { AreaVariant } from "./AreaVariant";
import { BarVariant } from "./BarVariant";
import { LineVariant } from "./LineVariant";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { AreaChartIcon, BarChartIcon, FileSearchIcon, LineChartIcon } from "lucide-react";

interface ChartProps {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

export function Chart({ data = [] }: ChartProps) {
    const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");

    function onTypeChange(type: "area" | "bar" | "line") {
        setChartType(type);
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0">
                <CardTitle className="text-xl line-clamp-1">
                    Transações
                </CardTitle>

                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 px-3 rounded-md">
                        <SelectValue placeholder="Tipo de Gráfico" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="area">
                            <div className="flex items-center">
                                <AreaChartIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico de Área
                                </p>
                            </div>
                        </SelectItem>

                        <SelectItem value="line">
                            <div className="flex items-center">
                                <LineChartIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico de Linha
                                </p>
                            </div>
                        </SelectItem>

                        <SelectItem value="bar">
                            <div className="flex items-center">
                                <BarChartIcon className="size-4 mr-2 shrink-0" />

                                <p className="line-clamp-1">
                                    Gráfico de Barra
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
                        {chartType === "area" && <AreaVariant data={data} />}
                        {chartType === "line" && <LineVariant data={data} />}
                        {chartType === "bar" && <BarVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
