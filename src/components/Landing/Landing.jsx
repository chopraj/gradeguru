import Faq from "./Faq";
import FeaturesDetailed from "./FeaturesDetailed";
import FeaturesGrid from "./FeaturesGrid";
import Footer from "./Footer";
import GradientCanvas from "./GradientCanvas";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";

function Landing() {
  return (
    <main className="font-['Poppins']">
      <Header />
      <GradientCanvas />
      <Hero />
      <FeaturesGrid />
      {/* <FeaturesDetailed /> */}
      {/* <Testimonials /> */}
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}

export default Landing;
