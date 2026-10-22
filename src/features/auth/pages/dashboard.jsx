import { Header } from "@/components/Header/Header"
import { Footer } from "@/components/Footer/Footer"
import HeroSection from "@/components/Home/HeroSection"
import { Features } from "@/components/Home/Features"
export default  function Dashboard() {
    return (
        <>
        <Header></Header>
        {/* <h1>he</h1> */}
        <HeroSection></HeroSection>
        <Features></Features>
        <Footer></Footer>
        </>
    )
}