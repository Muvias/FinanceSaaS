import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
    href: string;
    label: string;
    isActive?: boolean;
}

export function NavButton({ href, label, isActive }: NavButtonProps) {
    return (
        <Button
            size="sm"
            variant="outline"
            className={cn("w-full lg:w-auto justify-between font-normal text-white hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition-colors",
                isActive ? "bg-white/10" : "bg-transparent"
            )}
            asChild
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}
