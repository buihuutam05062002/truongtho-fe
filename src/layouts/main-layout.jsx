import { Outlet } from "react-router-dom"
import {Header} from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatBubble } from "@/features/chat/components/chat-bubble"


export default function MainLayout(){
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <ChatBubble />
        </>
    )
}