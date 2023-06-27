import { NAV_ITEMS } from "./Header";

const HeaderNav = () => {
  return (
    <div className="max-lg:hidden text-lg">
      <ul className="flex font-regular space-x-8 text-black">
        {NAV_ITEMS.map(({ title, href }) => {
          return (
            <li key={title}>
              <a href={href}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeaderNav;


// CHANGE BLACK HERE