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
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-indigo-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">with AI</span>
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
