"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

const Editor = ({
    onChange,
    initialContent,
    editable
}) => {

    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file) => {
        const res = await edgestore.publicFiles.upload({
            file
        });
        return res.url;
    }

    const editor = useCreateBlockNote({
        initialContent : initialContent ? JSON.parse(initialContent) : undefined,
        uploadFile : handleUpload
    });

    return (
        <div>
            <BlockNoteView
                editable={editable}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={()=>onChange(JSON.stringify(editor.document), null, 2)}
            />
        </div>
    );
}

export default Editor
