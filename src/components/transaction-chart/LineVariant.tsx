import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { CustomTooltip } from "../CustomTooltip";

interface LineVariantProps {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

export function LineVariant({ data }: LineVariantProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />

                <Tooltip content={<CustomTooltip />} />

                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3b92f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />

                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
