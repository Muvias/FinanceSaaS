import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

interface RadarVariantProps {
    data: {
        name: string;
        value: number;
    }[];
}

export function RadarVariant({ data }: RadarVariantProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="60%"
            >
                <PolarGrid />

                <PolarAngleAxis
                    dataKey="name"
                    style={{ fontSize: "12px" }}
                />

                <PolarRadiusAxis style={{ fontSize: "12px" }} />

                <Radar dataKey="value" stroke="#3b92f6" fill="#3b92f6" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}
