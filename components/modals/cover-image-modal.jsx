"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropdown";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

export const CoverImageModal  = () => {

    const [ file, setFile ] = useState();
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    
    const coverImage= useCoverImage();
    const { edgestore } = useEdgeStore();
    const update = useMutation(api.documents.update)
    const params = useParams();

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async(file) => {
        if(file){
            setIsSubmitting(true);
            setFile(file);


            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                  replaceTargetUrl: coverImage.url,
                },
            });

            await update({
                id : params.documentId,
                coverImage : res.url
            });

            onClose();
        }
    }

    return (
        <Dialog open = {coverImage.isOpen} onOpenChange = {coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-bold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
}