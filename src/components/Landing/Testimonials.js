import Container from "./Container";

const TESTIMONIALS = [
  {
    name: "Bonnie indigo",
    job: "Developer at Open AI",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I highly recommend this template to anyone looking to create stunning and high-converting landing pages effortlessly. It's a true gem in the world of digital marketing.",
  },
  {
    name: "Roberta Casas",
    job: "Chief marketing officer at Dropbox",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    quote:
      "This template is optimized for conversions, it helped me increase my conversion rates significantly and achieve my business goals.",
  },
  {
    name: "Jese Leos",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    job: "Software Engineer at Facebook",
    quote:
      "The template's responsiveness is truly exceptional. It automatically adapted to different devices, ensuring that my visitors had a seamless experience, whether they were using a smartphone, tablet, or desktop.",
  },
];

const TestimonialBlock = ({ quote, avatar, name, job }) => {
  return (
    <div className="break-inside-avoid shadow-xl">
      <figure className="p-6 rounded-lg bg-indigo-50 text-slate-800">
        <figcaption className="flex items-center space-x-3 mb-4">
          <img
            src={avatar}
            alt="placeholder"
            className="w-[65px] h-[65px] rounded-full"
          />
          <div>
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-lg font-light">{job}</p>
          </div>
        </figcaption>
        <blockquote className="max-w-2xl">
          <p className="text-xl text-slate-600">{quote}</p>
        </blockquote>
      </figure>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="bg-indigo-600 text-indigo-50 trapezoid-clip-y">
      <Container xpadded ypadded>
        <div>
          <div className="max-w-screen-sm text-center mx-auto">
            <h2 className="mb-4 text-4xl lg:text-6xl tracking-tight font-semibold bg-clip-text">
              Testimonials
            </h2>
            <p className="mb-8 font-light lg:mb-16 sm:text-xl">
              This is our wall of love, we are proud of what we have achieved.
            </p>
          </div>
        </div>
        <div className="columns-1 md:columns-2 xl:columns-3 text-slate-800 space-y-3 gap-3 px-3">
          {TESTIMONIALS.map((testimonial) => {
            return <TestimonialBlock {...testimonial} key={testimonial.name} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
