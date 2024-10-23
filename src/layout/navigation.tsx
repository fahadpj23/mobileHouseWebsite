import { Link } from "react-router-dom";

const Naviagtion = () => {
  return (
    <nav className="mr-6">
      <ul className="flex space-x-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Naviagtion;
