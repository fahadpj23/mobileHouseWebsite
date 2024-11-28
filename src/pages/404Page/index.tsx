import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" w-full h-[70vh] flex flex-col justify-center items-center space-y-2">
      <h1 className="text-[70px] font-bold">404</h1>
      <h1>Oops ! Page Not Found</h1>
      <h1>The page you're looking for doesn't exist or has been moved</h1>
      <div className="pt-6">
        <Link
          to="/"
          className="bg-orange-500 font-semibold  rounded-xl text-white p-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
