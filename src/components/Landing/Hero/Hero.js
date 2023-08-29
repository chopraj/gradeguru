import Container from "../Container";
import HeroCTA from "./HeroCTA";
import HeroHeadlines from "./HeroHeadlines";
import HeroImage from "./HeroImage";

const Hero = ({isMentor}) => {
  return (
      <Container id="home" className="pb-16 pt-20 text-center lg:pt-32">

        <div class="z-10 flex h-full w-full flex-col items-center justify-center transform-none opacity-1 pb-8 pt-8">
          <a class="relative flex flex-row items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
            🔥 <div data-orientation="vertical" role="none" class="shrink-0 bg-border w-[1px] mx-2 h-4"></div> <span class="animate-gradient bg-gradient-to-r from-[#8d3cde] via-[#9c40ff] to-[#8d3cde] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent inline">Powered by OpenAI</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4 text-gray-500"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <div class="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [--webkit-mask-composite:xor] [mask-composite:xor]"></div>
          </a>
        </div>


      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl text-center">
        Grade work in <br/>
        <s className="text-indigo-600">hours</s> seconds {" "}<br/>
        <span className="relative whitespace-nowrap logo-color -z-10 mb-5">
          with AI
        </span>
      </h1>
      <p className="mx-auto mt-12 max-w-2xl text-lg tracking-tight text-slate-700 text-center">
      <b>Grading reimagined: </b> Save time, supercharge meaningful feedback, track improvements, and empower student success. 
      </p>
      <div className="mt-10 flex justify-center gap-x-6 pb-16">
      <div className="flex flex-col items-center justify-center">
          <button className="bg-logo-color shadow-indigo-400/75 shadow-md transition-transform duration-200 hover:scale-[1.02] text-white px-7 py-4 rounded-full backdrop-blur-lg"><b>Get started today!</b></button>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
