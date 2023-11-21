import { useNavigate } from "react-router-dom";

const HeroCTA = () => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  }
  return (
    <div className="flex w-full items-baseline space-x-10 font-medium">
      <button
        onClick={handleGetStarted}
        className="w-1/2 sm:w-1/3 bg-indigo-600 text-center justify-center py-5 rounded-full text-white"
      >
        Get Started for free!
      </button>
    </div>
  );
};

export default HeroCTA;
