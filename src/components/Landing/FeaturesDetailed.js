import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Container from "./Container";
import featureOne from "../../assets/undraw4.svg";

const FEATURES = [
  {
    reverse: true,
    image: featureOne,
    title: "Speed up your grading workflow",
    description:
      "Deliver excellent feedback and grades to your students, even for assignments that are just for completion. ",
    checklist: [
      "20x faster grading workflow with the latest AI technology",
      "Automatic adjustments to specific rubrics",
      "3% average score difference between our AI and human graders",
    ],
  },
];

const FeatureCheklistWithImage = ({
  title,
  image,
  footer,
  checklist,
  description,
  reverse = false,
}) => {
  return (
    <div
      className={`flex items-center max-lg:flex-col ${
        reverse && "flex-row-reverse"
      }`}
    >
      <div
        className={`flex flex-col basis-1/2 text-lg max-w-screen-md  ${
          reverse ? "lg:ml-12" : "lg:mr-12"
        }`}
      >
        <h2 className="mb-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-800">
          {title}
        </h2>
        <p className="font-light lg:text-xl">{description}</p>
        <ul className="pt-8 space-y-5 border-t border-primary-900/10 my-7">
          {checklist.map((item) => {
            return (
              <li className="flex space-x-3" key={item}>
                <CheckCircleIcon className="w-5 text-indigo-400" />
                <span className="text-base font-medium leading-tight">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mb-8 lg:text-lg">{footer}</p>
      </div>
      <div className="flex shadow-gray-100 border-gray-200 rounded-lg basis-1/2 max-w-screen-md">
        <img src={image} alt="placeholder" className="rounded-lg shadow-none border-none" />
      </div>
    </div>
  );
};

const FeaturesDetailed = () => {
  return (
    <section className="text-slate-800">
      <Container xpadded ypadded>
        <div className="space-y-20">
          {FEATURES.map((feature) => {
            return (
              <FeatureCheklistWithImage {...feature} key={feature.title} />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesDetailed;
