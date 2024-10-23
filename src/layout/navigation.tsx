import { Link } from "react-router-dom";

const Naviagtion = () => {
  return (
    <nav className="mr-6">
      <ul className="flex space-x-8">
        <li>
          <Link className="font-semibold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">New Arrival</Link>
        </li>
        <li>
          <Link to="/contact">Special Offer </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Naviagtion;
