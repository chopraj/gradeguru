import Container from "../Container";
import HeaderButtons from "./HeaderButtons";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderNav from "./HeaderNav";
import Logo from "../Logo";

export const NAV_ITEMS = [
  {
    title: "Home",
    href: "#home",
    description: "Learn more about what we do",
  },
  {
    href: "#features",
    title: "Features",
    description: "See our features",
  },
  {
    href: "#pricing",
    title: "Pricing",
    description: "See our pricing",
  },
];

const Header = () => {
  return (
    <header id="home">
      <nav className="py-10 text-black">
        <Container xpadded>
          <div className="flex justify-between items-center">
            <Logo />
            <HeaderNav />
            <div className="flex items-center max-lg:hidden">
              <HeaderButtons />
            </div>
            <div className="lg:hidden z-10 mt-1">
              <HeaderMobileMenu />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;

// CHANGE BLACK HERE
