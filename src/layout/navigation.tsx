import { Link } from "react-router-dom";
import { NAVIGATIONITEMS } from "constants/navigationItems";

const Naviagtion = () => {
  return (
    <nav className="mr-6 hidden md:block">
      <ul className="flex space-x-8">
        {NAVIGATIONITEMS?.map((navigation) => {
          return (
            <li>
              <Link className="font-semibold" to={navigation?.link}>
                {navigation?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Naviagtion;
