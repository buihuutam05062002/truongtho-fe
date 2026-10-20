import {Label} from "@/components/ui/label"
export function FormField({id,label,error,action, children}){
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground">
                    {label}
                </Label>
                    {action}
            </div>

            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>
            )}

        </div>
    )
}