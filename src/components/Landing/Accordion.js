import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const Accordion = ({ title, description }) => {
  const [isToggled, setIsToggled] = useState(true);

  const toggle = () => setIsToggled(!isToggled);

  return (
    <div onClick={toggle} className="cursor-pointer py-5 border-b border-slate-800 last:border-0">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">{title}</p>
        {isToggled ? (
          <ChevronDownIcon className="w-5" />
        ) : (
          <ChevronUpIcon className="w-5" />
        )}
      </div>
      {!isToggled && <div className="mt-3 transition duration-150 ease-out">{description}</div>}
    </div>
  );
};

export default Accordion;
