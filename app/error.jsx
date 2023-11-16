"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/images/8030432_3828539.svg"
                height={300}
                width={300}
                alt="Error"
            />
            <Button asChild>
                <Link href="/documents">
                    Go Back
                </Link>
            </Button>
        </div>
    );
}

export default Error;