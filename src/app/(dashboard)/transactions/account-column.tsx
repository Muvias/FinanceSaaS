import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

interface AccountColumnProps {
    account: string;
    accountId: string;
}

export function AccountColumn({ account, accountId }: AccountColumnProps) {
    const { onOpen: onOpenAccount } = useOpenAccount();

    function onClick() {
        onOpenAccount(accountId);
    };

    return (
        <div
            className="flex items-center cursor-pointer hover:underline underline-offset-2"
            onClick={onClick}
        >
            {account}
        </div>
    )
}
