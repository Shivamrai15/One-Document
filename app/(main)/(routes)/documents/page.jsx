"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {

    const {user} = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({
            title : "Untitled"
        }).then((documentId) => router.push(`/documents/${documentId}`));

        toast.promise(promise, {
            loading : "Creating a new document...",
            success : "New document created!",
            error : "Failed to create a new document."
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/images/10914572_4612524.svg"
                alt="Image"
                height="300"
                width="300"
            />
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                Welcome to {user?.firstName}&apos; Notebook
            </h2>
            <Button
                onClick = {onCreate}
            >
                <PlusCircleIcon className="h-4 w-4 mr-2"/>
                Create a document
            </Button>
        </div>
    )
}

export default DocumentsPage;