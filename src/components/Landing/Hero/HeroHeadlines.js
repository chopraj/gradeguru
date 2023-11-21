const HeroHeadlines = () => {
  return (
    <>
      <div className="font-small mb-10 leading-none relative text-[13vw] sm:text-[10vw] lg:text-[7vw] xl:text-[5vw]">
        <h1 className="text-black translate-3d-0">
          Grade work <br /> in <s className="text-indigo-600">hours</s> seconds <br /> with AI
        </h1>
        <h1 className="text-black absolute inset-0 -z-10" aria-hidden="true">
          Grade work <br /> in <s className="text-indigo-600">hours</s> seconds <br /> with AI
        </h1>
      </div>
      <p className="text-xl text-slate-800 mb-10 max-w-screen-sm mr-5">
        Grading reimagined: Save time, supercharge meaningful feedback, track improvements, and empower student success. 
      </p>
    </>
  );
};

export default HeroHeadlines;