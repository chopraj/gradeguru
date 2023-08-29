import {
  AcademicCapIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  RectangleStackIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/solid";

import Container from "./Container";

const FEATURES = [
  {
    icon: <RocketLaunchIcon className="w-6" />,
    title: "Streamline Grading",
    description: "You're busy enough! We speed up the grading process 20 fold by leveraging AI to give accurate feedback.",
  },
  {
    title: "Give Actionable Feedback",
    description:
      "Each grade is justified with a detailed explanation of why the student received that grade. This allows students to improve their work and learn from their mistakes.",
    icon: <AcademicCapIcon className="w-6" />,
  },
  {
    icon: <PresentationChartLineIcon className="w-6" />,
    title: "Track Student Growth",
    description:
      "Empower your students and watch them grow! Our iteractive platform allows you to track student growth over time and watch them improve.",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="bg-indigo-300/10 text-slate-800 trapezoid-clip-b">
      <Container xpadded ypadded>
        <div className="mb-16 max-md:flex flex-col items-center w-full">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl lg:text-6xl tracking-tight font-semibold text-indigo-500">
              Designed for <br/> classrooms just like yours
            </h2>
            <p className="sm:text-xl">
              Here at GradeGuru we focus on streamlining and improving the grading process for teachers and students alike.
            </p>
          </div>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {FEATURES.map(({ icon, title, description }) => {
            return (
              <div className="flex" key={title}>
                <div className="flex shrink-0 items-center justify-center mb-4 w-12 h-12 rounded-full bg-indigo-400 mr-5 text-indigo-50">
                  {icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-2 text-xl font-bold">{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesGrid;
