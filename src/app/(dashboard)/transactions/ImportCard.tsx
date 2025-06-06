import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertAmountToMiliunits } from "@/lib/utils";
import { ImportTable } from "./ImportTable";
import { format, parse } from "date-fns";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee"
];

interface SelectedColumnsState {
    [key: string]: string | null;
}

interface ImportCardProps {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

export function ImportCard({ data, onCancel, onSubmit }: ImportCardProps) {
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    function onTableHeadSelectChange(columnIndex: number, value: string | null) {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;

            return newSelectedColumns;
        })
    }

    function handleContinue() {
        function getColumnIndex(column: string) {
            return column.split("_")[1];
        }

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);

                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);

                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                })

                return transformedRow.every((item) => item === null) ? [] : transformedRow;
            }).filter((row) => row.length > 0)
        };

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];

                if (header !== null) {
                    acc[header] = cell;
                }

                return acc;
            }, {});
        });

        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMiliunits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }));

        onSubmit(formattedData);
    };

    return (
        <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transaction
                    </CardTitle>

                    <div
                        className="flex flex-col lg:flex-row items-center gap-2"
                    >
                        <Button
                            size="sm"
                            onClick={onCancel}
                            className="w-full lg:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button
                            size="sm"
                            onClick={handleContinue}
                            disabled={progress < requiredOptions.length}
                            className="w-full lg:w-auto"
                        >
                            Continuar ({progress}/{requiredOptions.length})
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
