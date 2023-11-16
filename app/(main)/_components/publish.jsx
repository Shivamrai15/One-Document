"use client";

import { Button } from "@/components/ui/button";
import {
    PopoverTrigger,
    PopoverContent,
    Popover
} from "@/components/ui/popover";

import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

export const Publish = ({initialData}) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [value, copy] = useCopyToClipboard();

    const url = `${origin}/preview/${initialData._id}`;

    const onPublic = () => {
        setIsSubmitting(true);

        const promise = update({
            id : initialData._id,
            isPublished : true
        })
        .finally(()=>setIsSubmitting(false));

        toast.promise(promise, {
            loading : "Publishing...",
            success : "Document published!",
            error : "Failed to publish document"
        });
    }

    const onPrivate = () => {
        setIsSubmitting(true);

        const promise = update({
            id : initialData._id,
            isPublished : false
        })
        .finally(()=>setIsSubmitting(false));

        toast.promise(promise, {
            loading : "Unpublishing...",
            success : "Document unpublished!",
            error : "Failed to unpublish document"
        });
    }

    const onCopy = ()=>{
        copy(url);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        }, 1500);
    }


    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size = "sm" variant = "ghost">
                    Publish
                    {initialData.isPublished &&
                        <Globe className="text-green-500 w-4 h-4 ml-2"/>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className = "w-72"
                align = "end"
                alignOffset = {8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-green-500 animate-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-green-500">
                                This document is live on web
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input type="text"
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button
                                onClick = {onCopy}
                                className = "h-8 rounded-l-none"
                                disabled = {copied} 
                            >
                                {copied ? (
                                    <Check className=" h-4 w-4"/>
                                ) : (
                                    <Copy className="h-4 w-4"/>
                                )}
                            </Button>
                        </div>
                        <Button
                            size = "sm"
                            className ="w-full text-xs"
                            disabled = {isSubmitting}
                            onClick = {onPrivate}
                        >
                            Private
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe 
                            className="h-8 w-8 text-muted-foreground mb-2"
                        />
                        <p className="text-sm font-medium mb-2">
                            Publish this document
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with other.
                        </span>
                        <Button
                            disabled = {isSubmitting}
                            onClick = {onPublic}
                            className = "w-full text-xs"
                            size = "sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
