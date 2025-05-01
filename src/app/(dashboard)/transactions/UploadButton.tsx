import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useCSVReader } from "react-papaparse";

interface UploadButtonProps {
    onUpload: (results: any) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
    const { CSVReader } = useCSVReader();

    return (
        <CSVReader
            onUploadAccepted={onUpload}
        >
            {({ getRootProps }: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                >
                    <UploadIcon className="size-4 mr-2" />

                    Importar
                </Button>
            )}
        </CSVReader>
    )
}
