export function FeatureItem({icon:Icon, title,description}){
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