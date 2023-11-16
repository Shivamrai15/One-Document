"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

const DocumentList = ({
    parentDocumentId,
    level = 0,
}) => {

    const params = useParams();
    const router = useRouter();
    const [ expanded, setExpanded ] = useState({});

    const onExpand = (documentId) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId] : !prevExpanded[documentId]
        }));
    };

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument : parentDocumentId
    });

    const onRedirect = (documentId) => {
        router.push(`/documents/${documentId}`);
    };

    if(documents === undefined){
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <p
                style={{
                    paddingLeft : level ? `${(level*12)+25}px` : undefined
                }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No pages inside
            </p>
            { documents.map((document)=>(
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={()=>onRedirect(document._id)}
                        label={document.title}
                        Icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={()=>onExpand(document._id)}
                        expended={expanded[document._id]}
                    />
                    {expanded[document._id] && (
                       <DocumentList
                          parentDocumentId={document._id}
                          level={level+1}
                       />
                    )}
                </div>
            ))

            }
        </>
    )
}

export default DocumentList;