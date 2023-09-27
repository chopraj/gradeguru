import Container from "../Container";
import HeroCTA from "./HeroCTA";
import HeroHeadlines from "./HeroHeadlines";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section id="hero" className="text-slate-800 relative overflow-hidden">
      <Container xpadded>
        <div className="max-lg:py-10 lg:h-[80vh] flex">
          <div className="flex flex-col lg:basis-1/2 justify-center">
            <HeroHeadlines />
            <HeroCTA />
          </div>
          <HeroImage />
        </div>
      </Container>
    </section>
  );
};

export default Hero;