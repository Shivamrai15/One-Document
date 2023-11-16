import { Loader } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";


const spinnerVariant = cva(
    "text-muted-foreground animate-spin",
    {
        variants : {
            size : {
                default : "h-4 w-4",
                sm : "h-2 w-2",
                lg : "h-6 w-6",
                icon : "h-10 w-10"
            }
        },
        defaultVariants : {
            size : "default"
        }
    }
)

const Spinner = ({size}) => {
    return (
        <Loader
         className={cn(
            spinnerVariant(size)
         )}
        />
    );
}

export default Spinner;