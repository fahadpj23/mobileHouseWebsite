import { FC } from "react";

interface props {
  title: string;
  handleForm: any;
}
const Header: FC<props> = ({ title, handleForm }) => {
  return (
    <div className="flex justify-between p-2 ">
      <h1 className="text-lg font-semibold">{title}</h1>
      <button
        className="bg-green-500 p-2 text-white rounded-md"
        onClick={() => handleForm()}
      >
        Add+
      </button>
    </div>
  );
};
export default Header;
