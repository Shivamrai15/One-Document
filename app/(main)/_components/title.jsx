"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

export const Title = ({initialData}) => {
    
    const inputRef = useRef(null);
    const update = useMutation(api.documents.update);

    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);
    
    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0)

    }

    const disableInput = () => {
        setIsEditing(false); 
    }

    const onChange = (event) => {
        setTitle(event.target.value);
        update({
            id : initialData._id,
            title : event.target.value || "Untitled"
        })
    };

    const onKeyDown = (event) => {
        if(event.key === "Enter"){
            disableInput();
        }
    }


    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick = {enableInput}
                    onBlur = {disableInput}
                    onChange = {onChange}
                    onKeyDown = {onKeyDown}
                    value = {title}
                    className = "h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    onClick = {enableInput}
                    variant = "ghost"
                    size = "sm"
                    className = "font-normal h-auto p-1"
                >
                    <span className="truncate">
                        {initialData?.title}
                    </span>
                </Button>
            )}
        </div>
    );

}

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className="h-8 w-20 rounded-md"/>
    );
}
