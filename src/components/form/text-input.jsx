import {Mail} from "lucide-react"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"
export function EmailInput({className, ...props}){
    return (
        <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/3 size-4 -translate-y-1/2 text-primary/70"></Mail>
            <Input
                type='email'
                {...props}
                className={cn("h11 px-10", className)}
            ></Input>

        </div>
    )
}
