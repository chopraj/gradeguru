import Container from "./Container";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="text-white bg-indigo-500">
      <Container xpadded ypadded>
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo isFooter/>
            <p>Disrupting the education landscape</p>
          </div>
          <div className="grid grid-cols-1x gap-8 sm:gap-6 sm:grid-cols-1">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul>
                <li className="mb-4">
                  <a href="https://docs.google.com/document/d/1QXPFs7zq5CUJQjim698qQEo-gnsR3Cab_8jRHrt9uNE/edit?usp=sharing" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-primary-100 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm  sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:underline">
              GradeGuru™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
