import {
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
const Logo = ({isFooter}) => {


  if (isFooter) {
    return (
      <a href="#" className="text-4xl font-bold leading-3">
         <AcademicCapIcon className="inline-block w-8 h-8" /> GradeGuru
      </a>
    );
  }
  return (
    <a href="#" className="text-4xl font-bold leading-3 text-indigo-500">
       <AcademicCapIcon className="inline-block w-8 h-8" /> GradeGuru
    </a>
  );
};

export default Logo;
