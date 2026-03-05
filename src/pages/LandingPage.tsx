import { Navbar } from "../components/Navbar"
import { Hero } from "../components/Hero"
import { ReimagineSection } from "../components/ReimagineSection"

import { TemplatesSection } from "../components/TemplatesSection"

import { TestimonialSection } from "../components/TestimonialSection"
import { WhosItForSection } from "../components/WhosItForSection"
import { FAQSection } from "../components/FAQSection"
import { FreeYourTeamSection } from "../components/FreeYourTeamSection"
import { Footer } from "../components/Footer"


export function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-purple-300 selection:text-black">
            <Navbar />
            <main>
                {/* 1. Hero */}
                <Hero />

                {/* 2. Reimagine everyday work */}
                <ReimagineSection />

                {/* 7. Testimonial (Moved) */}
                <TestimonialSection />








                {/* 5. Expert-designed templates */}
                <TemplatesSection />





                {/* 8. Who's it for */}
                <WhosItForSection />

                {/* 10. Free your team CTA */}
                <FreeYourTeamSection />

                {/* 9. FAQ */}
                <FAQSection />
            </main>

            {/* 11. Footer */}
            <Footer />
        </div>
    )
}
