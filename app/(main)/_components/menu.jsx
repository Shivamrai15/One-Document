"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Menu = ({documentId}) => {

    const router = useRouter();
    const {user} = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({id : documentId});

        toast.promise(promise, {
            loading : "Moving to trash...",
            success : "Document moved to trash!",
            error : "Failed to archive document"
        });

        router.push("/documents");
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size  = "sm" variant = "ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className = "w-60" align = "end" alignOffset = {8} forceMount>
                <DropdownMenuItem onClick = {onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <div className="text-xs text-muted-foreground italic p-2">
                    Last edited : {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return(
        <Skeleton className="h-8 w-8"/>
    );
}
