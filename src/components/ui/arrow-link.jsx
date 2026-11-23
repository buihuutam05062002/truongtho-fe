import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {cn} from "@/lib/utils"

export function ArrowLink({to, children, className}){
    return (
        <Link
            to={to}
            className={cn("inline-flex items-center gap-4 border-b border-border pb-2 text-[13px] text-foreground transition-colors hover:border-gold", className)}
        >
            {children}
            <ArrowRight className="size-4.5 text-rose" aria-hidden="true"></ArrowRight>
        </Link>
    )
}