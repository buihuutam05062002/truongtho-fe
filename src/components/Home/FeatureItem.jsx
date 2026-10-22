export function FeatureItem({icon:Icon, title,description}){
    return (
        <div className="flex items-center">
            <Icon color="#bca27a" className="me-5"></Icon>
            <div >
                <p>{title}</p>
                <p>{description}</p>
            </div>
         
        </div>
    )
}