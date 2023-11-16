"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {

    const scrolled = useScrollTop();
    const {isAuthenticated, isLoading} = useConvexAuth();

    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 dark:bg-neutral-900 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                   <Spinner/>
                )}

                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton>
                            <Button variant = "ghost" size = "sm">
                                Login
                            </Button>
                        </SignInButton>
                        <SignInButton>
                            <Button size = "sm">
                                Get Notebook Free
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant = "ghost">
                            <Link href="/documents">
                                Enter Notebook
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </>
                )}
                <ModeToggle
                    size = "sm"
                />
            </div>
        </div>
    )
}

export default Navbar;