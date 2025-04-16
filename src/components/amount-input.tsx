import { cn } from "@/lib/utils";

import CurrencyInput from "react-currency-input-field";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from "lucide-react";

interface AmountInputProps {
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string | undefined) => void;
}

export function AmountInput({ onChange, value, disabled, placeholder }: AmountInputProps) {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    function onReverseValue() {
        if (!value) return;

        const newValue = parseFloat(value) * -1;

        onChange(newValue.toString());
    };

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={onReverseValue}
                            className={cn("absolute top-1.5 left-1.5 p-2 flex items-center justify-center rounded-md bg-slate-400 hover:bg-slate-500 transition-colors",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                isExpense && "bg-rose-500 hover:bg-rose-600"
                            )}
                        >
                            {!parsedValue && <InfoIcon className="size-3 text-white" />}
                            {isIncome && <PlusCircleIcon className="size-3 text-white" />}
                            {isExpense && <MinusCircleIcon className="size-3 text-white" />}
                        </button>
                    </TooltipTrigger>

                    <TooltipContent>
                        Use [+] para recebimentos e [-] para despesas, ou clique aqui após inserir o valor para mudar
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <CurrencyInput
                prefix="R$ "
                placeholder={placeholder}
                value={value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
                className="flex h-10 w-full pl-10 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />

            <p className="text-xs text-muted-foreground mt-1">
                {isIncome && "Isso irá contar como recebimento"}
                {isExpense && "Isso irá contar como despesa"}
            </p>
        </div>
    )
}
