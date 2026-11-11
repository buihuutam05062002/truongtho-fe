
import HeroSection from "@/features/home/components/hero-section"
import { Features } from "@/features/home/components/features"
import { AboutSection } from "@/features/home/components/about-section"
import { FeatureMenu } from "@/features/home/components/feature-menu"
import { FeatureCategory } from "@/features/home/components/feature-category"
import { PrivateDining } from "@/features/home/components/private-dining"
import { FeatureFeedBack } from "@/features/home/components/feature-feedback"
import { ReserveSection } from "../components/reserve-section"
import { DiningAtmosphere } from "../components/dining-atmosphere"
export default  function HomePage() {
    return (
        <main>
            <HeroSection></HeroSection>
            <Features></Features>
            <AboutSection></AboutSection>
            <FeatureMenu></FeatureMenu>
            <FeatureCategory></FeatureCategory>
            <DiningAtmosphere></DiningAtmosphere>
            <PrivateDining></PrivateDining>
            <FeatureFeedBack></FeatureFeedBack>
            <ReserveSection></ReserveSection>
        </main>
    )
}