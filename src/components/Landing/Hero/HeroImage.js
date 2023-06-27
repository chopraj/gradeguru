import dashboard from "../../../assets/undraw2.svg";

const HeroImage = () => {
  return (
    <img
      src={dashboard}
      alt="placeholder"
      className="absolute left-[calc(50%+15px)] h-[60vh] top-[50%] -translate-y-[50%] rounded-lg shadow-lg max-lg:hidden border-transparent shadow-none"
    />
  );
};

export default HeroImage;
