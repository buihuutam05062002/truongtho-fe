import { Header } from "@/components/Header/Header"
import { Footer } from "@/components/Footer/Footer"
import HeroSection from "@/components/Home/HeroSection"
import { Features } from "@/components/Home/Features"
import { AboutSection } from "@/components/Home/AboutSection"
import { FeatureMenu } from "@/components/Home/FeatureMenu"
import { FeatureCategory } from "@/components/Home/FeatureCategory"
import { PrivateDining } from "@/components/Home/PrivateDining"
import { FeatureFeedBack } from "@/components/Home/FeatureFeedback"
export default  function Dashboard() {
    return (
        <>
        <Header></Header>
        {/* <h1>he</h1> */}
        <HeroSection></HeroSection>
        <Features></Features>
        <AboutSection></AboutSection>
        <FeatureMenu></FeatureMenu>
        <FeatureCategory></FeatureCategory>
        <PrivateDining></PrivateDining>
        <FeatureFeedBack></FeatureFeedBack>
        <Footer></Footer>
        </>
    )
}