import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets : ["latin"],
    weight : ["400", "600"]
});

const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/images/logo.png"
                height={40}
                width={40}
                alt="Logo"
                className="block dark:hidden"
            />
            <Image
                src="/images/logo-dark.png"
                height={40}
                width={40}
                alt="Logo"
                className="hidden dark:block"
            />
            <p className={cn(
                "font-semibold whitespace-nowrap",
                font.className
            )}>
                One Notebook
            </p>
        </div>
    )
}

export default Logo;