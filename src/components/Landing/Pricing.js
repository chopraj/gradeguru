import { CheckIcon } from "@heroicons/react/24/solid";
import Container from "./Container";
import {useNavigate} from 'react-router-dom';

const PRICINGS = [
  {
    title: "Starter",
    isStarter: true,
    description: "Best option for teachers just dipping their toes in to save time and increase efficiency.",
    price: 15,
    checklist: [
      "GPT-3.5 model",
      "Rubric specific analysis",
      "No setup, or hidden fees",
      "Free updates forever",
    ],
  },
  {
    title: "Premium",
    description: "Best option for teachers who have many many students, and require more advanced models.",
    price: 20,
    checklist: [
      "Track student progress",
      "Premium GPT-4 model",
      "Rubric specific analysis",
      "No setup, or hidden fees",
      "Free updates forever",
    ],
  },
];

const PriceCard = ({ title, description, price, checklist, isStarter }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  }

  return (
    <div className="flex flex-col content-between p-6 mx-auto max-w-lg text-center shadow-[0px_5px_12px_0px_rgba(0,0,0,.3)] border border-gray-100 rounded-lg xl:p-8 text-slate-800">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-medium">${price}</span>
        <span>/month</span>
      </div>
      <ul className="mb-8 space-y-4 text-left">
        {checklist.map((item) => {
          return (
            <li className="flex items-center space-x-3" key={item}>
              <CheckIcon className="w-5" />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
      {isStarter ? (
        <button
        onClick={handleGetStarted}
        className="text-white bg-indigo-500 hover:bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-12 text-center"
      >
        Get started
      </button>
      ): (
        <button
        onClick={handleGetStarted}
        className="text-white bg-indigo-500 hover:bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center"
      >
        Get started
      </button>
      )}
      
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="text-slate-800">
      <Container xpadded ypadded>
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl lg:text-6xl tracking-tight font-semibold text-indigo-600">
            Invest in your classroom's potential
          </h2>
          <p className="mb-5 font-light sm:text-xl">
            Simple and predicible pricing. Never any hidden fees or surprises.
          
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {PRICINGS.map((pricing) => {
            return <PriceCard {...pricing} key={pricing.title} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
