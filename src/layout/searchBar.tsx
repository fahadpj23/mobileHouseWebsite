import { FC, useState } from "react";
import { Divider } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ALLPHONES } from "constants/allPhone";
import { Link } from "react-router-dom";

const SearchBar: FC<any> = ({ setSearchOpen }) => {
  const [searchData, setSearchData] = useState<any>([]);

  const handleSearch = (search: any) => {
    const filteredData = ALLPHONES.filter((phone) =>
      phone.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(search.toLowerCase().replace(/\s+/g, ""))
    );
    setSearchData(filteredData);
  };

  return (
    <div className="fixed top-0  left-0 right-0 w-screen h-screen bg-white z-40">
      <div className="flex space-x-3 w-full   p-2 ">
        <SearchOutlinedIcon sx={{ color: "#0e86d4" }} />
        <input
          autoFocus
          placeholder="search Here"
          className="focus:outline-none"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <Divider />
      <div className="flex flex-col space-y-4 overflow-y-auto ml-3 h-[90vh]">
        {searchData?.map((phone: any) => {
          return (
            <Link
              onClick={() => setSearchOpen(false)}
              to={`/phone/${phone?.id}/${encodeURIComponent(phone?.name)}`}
              key={phone?.id}
              className="flex items-center space-x-4"
            >
              <div className="p-1">
                <img
                  src={phone?.image}
                  alt="phone Image"
                  className=" w-8 h-10"
                />
              </div>
              <div className="text-xs">
                <h1>{phone?.name}</h1>
                <h1 className="text-green-600">₹{phone?.salesPrice}</h1>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-2 fixed bottom-1 left-0 w-full">
        <button
          onClick={() => setSearchOpen(false)}
          className="border-2 border-blue-600 bg-white  text-blue-600 text-center p-2  w-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
