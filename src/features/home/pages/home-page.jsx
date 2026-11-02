
import HeroSection from "@/features/home/components/hero-section"
import { Features } from "@/features/home/components/features"
import { AboutSection } from "@/features/home/components/about-section"
import { FeatureMenu } from "@/features/home/components/feature-menu"
import { FeatureCategory } from "@/features/home/components/feature-category"
import { PrivateDining } from "@/features/home/components/private-dining"
import { FeatureFeedBack } from "@/features/home/components/feature-feedback"
export default  function HomePage() {
    return (
        <main>
            <HeroSection></HeroSection>
            <Features></Features>
            <AboutSection></AboutSection>
            <FeatureMenu></FeatureMenu>
            <FeatureCategory></FeatureCategory>
            <PrivateDining></PrivateDining>
            <FeatureFeedBack></FeatureFeedBack>
        </main>
    )
}