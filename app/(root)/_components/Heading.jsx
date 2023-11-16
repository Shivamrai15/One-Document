"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
    subsets : ["latin"],
    weight : ["400", "600", "900", "800"]
});


const Heading = () => {


    const {isAuthenticated, isLoading} = useConvexAuth()

    return (
        <div className="max-w-3xl space-y-6 bg-">
            <h1 className={cn(
                "text-3xl sm:text-5xl md:text-6xl font-extrabold",
                font.className
            )}>
            Unleash Your Creativity and Productivity with <span className="whitespace-nowrap text-orange-500">One Notebook</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-300">
                One Notebook is the connected workspace where <br /> better, faster work happens.
            </h3>
            {isLoading && (
                <div className="w-full flex justify-center items-center">
                    <Spinner size="lg"/>
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link
                        href="/documents"
                    >
                        Enter Notebook
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}
        </div>
    )
}

export default Heading;