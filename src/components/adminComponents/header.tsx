
import { FC} from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


interface props {
  title: string;
  handleForm: any;
  searchValue?:any;
  handleSearch?:any;
}
const Header: FC<props> = ({ title, handleForm,searchValue ,handleSearch}) => {
  
   
  return (
    <>
    <div className="flex justify-between p-2 ">
      <h1 className="text-lg font-semibold">{title}</h1>
      
      
    
      <button
        className="bg-green-500 p-2 text-white rounded-md"
        onClick={() => handleForm()}
        >
        Add+
      </button>
      </div>
       {
        title==="Product" && <div className="flex items-center w-full p-3 border-b">
                <SearchOutlinedIcon sx={{ color: "#0e86d4" }} />
                <input
                   placeholder="Search product..."
                  className="focus:outline-none flex-1 ml-2 "
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  />
              </div>
      }
                  </>
  );
};
export default Header;
