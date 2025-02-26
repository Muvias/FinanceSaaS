import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
    return (
        <Link href="/">
            <div className="hidden lg:flex items-center">
                <Image 
                    src="/logo.svg"
                    alt="Logo"
                    height={28}
                    width={28}
                />

                <p className="ml-2.5 text-2xl font-semibold text-white">
                    Finance
                </p>
            </div>
        </Link>
    )
}
