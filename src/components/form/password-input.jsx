import { useState } from "react";
import {Eye,EyeOff,Lock} from "lucide-react"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"

export function PasswordInput({className,...props}){
    const [show,setShow] = useState(false)
    return (
        <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -traslate-y-1/2 text-primary/70"></Lock>
            <Input 
                {...props}
                type={show ? "text" : "password"}
                className={cn("h-11 px-10", className)}
            ></Input>
            <button type="button"
                    onClick={ () => setShow((v) => !v)}
                    aria-label={show? "Ẩn" : "Hiện"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    
            >{!show ? <EyeOff></EyeOff> : <Eye></Eye>}</button>
        </div>
    )
}