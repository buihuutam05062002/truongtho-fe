export function FeatureItem({icon:Icon, title,description, variant = "row"}){
    if(variant === "column"){
        return (
            <div className="space-y-3.5 border-t border-border pt-[29px]">
                <Icon className="size-7 text-gold" strokeWidth={1.25}></Icon>
                <p className="font-serif text-[22px] leading-[30px] text-foreground">{title}</p>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
        )
    }
    return (
        <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-gold">
                <Icon className="size-5"></Icon>
            </span>
            <div className="space-y-1">
                <p className="font-serif text-xl text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}