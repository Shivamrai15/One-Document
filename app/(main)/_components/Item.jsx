"use client";

import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

import { 
    ChevronDown,
    ChevronRight,
    MoreHorizontal,
    Plus,
    Trash
} from 'lucide-react';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';


const Item = ({
    id,
    documentIcon,
    active,
    expended,
    isSearch,
    level,
    onExpand,
    onClick,
    label,
    Icon
}) => {

    const create  = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const router = useRouter();
    const { user } = useUser();

    const handleExpand = (event) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (event) => {
        event.stopPropagation();
        if(!id) return;
        const promise = create({
            title : "Untitled",
            parentDocument : id
        }).then((documentId)=>{
            if(!expended){
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading : "Creating a new document...",
            success : "New document created!",
            error : "Failed to create a new document."
        });
    }

    const onArchive = (event) => {
        event.stopPropagation();
        if(!id) return;
        const promise = archive({id}).then(()=>router.push("/documents"));
        toast.promise(promise, {
            loading : "Moving to trash...",
            success : "Document moved to trash!",
            error : "Failed to archive document."
        });
    }

    const ChevronIcon = expended ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role='button'
            style={{paddingLeft : level ? `${(level*12)+12}px` : "12px"}}
            className={cn(
                'group min-h-[27px] text-sm py-2 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role='button'
                    className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
                    onClick={handleExpand}
                >
                    <ChevronIcon
                        className='h-4 w-4 shrink-0 text-muted-foreground/50'  
                    />
                </div>
            )}
            {documentIcon ? (
                <div className='shrink-0 mr-2 text-[18px]'>
                    {documentIcon}
                </div> 
            ): (
            <Icon className = "shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
            )}
            <span className='truncate'>
                {label}
            </span>
            {isSearch && (
                <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    <span className='text-xs'>
                        CTRL
                    </span>K
                </kbd>
            )}
            {!!id && (
                <div className='ml-auto flex items-center gap-x-2'>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild
                                onClick={(e)=>e.stopPropagation()}
                            >
                                <div
                                    role='button'
                                    className='md:opacity-0 md:group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
                                >
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground'/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className ="w-60"
                                align = "start"
                                side = "right"
                                foceMount
                            >
                                <DropdownMenuItem
                                    onClick = {onArchive}
                                >
                                   <Trash className='h-4 w-4 mr-2'/>
                                   Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <div
                                    className='text-xs text-muted-foreground p-2 italic'
                                >
                                    Last edited {user?.fullName}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu> 
                    </div>
                    <div
                        role='button'
                        onClick={onCreate}
                       className='md:opacity-0 md:group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600' 
                    >
                        <Plus className='h-4 w-4 text-muted-foreground'/>
                    </div>
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }) {
    return (
        <div
            style={{
                paddingLeft : level ? `${(level*12) +25}px` : "12px"
            }}
            className='flex gap-x-2 py-[3px]'
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}

export default Item;