import { FC } from "react";

interface props {
  title: string;
  handleAddButton: any;
}
const Header: FC<props> = ({ title, handleAddButton }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => handleAddButton()}>Add</button>
    </div>
  );
};
export default Header;
