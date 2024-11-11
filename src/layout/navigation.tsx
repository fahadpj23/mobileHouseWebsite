import { Link } from "react-router-dom";
import { NAVIGATIONITEMS } from "constants/navigationItems";

const Naviagtion = () => {
  return (
    <nav className="mr-6 hidden md:block">
      <ul className="flex space-x-6">
        {NAVIGATIONITEMS?.map((navigation) => {
          return (
            <li key={navigation?.title}>
              <Link
                className="font-semibold flex space-x-2 items-center"
                to={navigation?.link}
              >
                <div className="">{navigation?.icon}</div>
                <h1 className="font-semibold text-sm">{navigation?.title}</h1>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Naviagtion;
