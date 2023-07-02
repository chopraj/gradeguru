import "./Logo.css"

import {
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import GGLogo from '../../assets/GGLogoNew.png'
import GGLogoWhite from '../../assets/GGLogo-white.png'

const Logo = ({isFooter}) => {


  if (isFooter) {
    return (
      <a href="#" className="text-4xl font-bold leading-3">
         <img src={GGLogoWhite} className="inline-block w-8 h-8" /> GradeGuru
      </a>
    );
  }
  return (
    <a href="#" className="text-4xl font-bold leading-3 logo-color">
       <img src={GGLogo} className="inline-block w-8 h-8" /> GradeGuru
    </a>
  );
};

export default Logo;
