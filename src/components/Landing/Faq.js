import Accordion from "./Accordion";
import Container from "./Container";

const FAQ = [
  {
    question: "How does GradeGuru work?",
    answer:
      "Great question! GradeGuru is built on top of OpenAI's GPT-3.5 and GPT-4 models to accurately analyze student responses. These models have been trained large amounts of internet data enabling them to understand the nuances of student writing and provide feedback that is both accurate and actionable. ",
  },
  {
    question: "I use specific rubrics for my assignments. Can GradeGuru still work for me?",
    answer:
      "Absolutely! GradeGuru is designed to work with any rubric and tailor its grading and feedback to your specific needs.",
  },
  {
    question: "How can I integrate GradeGuru into my teaching workflow?",
    answer:
      "We recommend using GradeGuru as a first-pass grader to help you quickly identify student responses that need your attention. Additionally, GradeGuru can be used to provide students with tips for improvement even for assignments that you exclusively grade for completion; this way students have more opportunities to leverage feedback and grow.",
  },
  {
    question: "Where should I go if I have more questions?",
    answer:
      "Feel free to contact us at gradeguru.ai@gmail.com. We're happy to answer any questions or concerns you may have.",
  },
];

const Faq = () => {
  return (
    <section className="text-slate-800 bg-indigo-50 trapezoid-clip-t">
      <div className="mx-auto max-w-screen-md">
        <Container xpadded ypadded>
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="mb-24 text-4xl lg:text-6xl tracking-tight font-semibold">
              FAQ
            </h2>
          </div>
          {FAQ.map(({ question, answer }) => {
            return (
              <Accordion title={question} description={answer} key={question} />
            );
          })}
        </Container>
      </div>
    </section>
  );
};

export default Faq;
