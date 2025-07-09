import { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import LazyImage from "components/commonComponents/imageLazyLoading";

const DesktopSearch = () => {
  const [searchData, setSearchData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (search: any) => {
    setSearchValue(search);
  };

  const handleSelect = () => {
    setSearchData([]);
    setSearchValue("");
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-500 rounded-lg p-2 w-[22vw] justify-between">
        <input
          value={searchValue}
          placeholder="search here"
          className="focus:outline-none"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <SearchOutlinedIcon sx={{ color: "#808080" }} />
      </div>
      {searchValue ? (
        <div className="absolute -left-3 top-12 flex flex-col space-y-4 overflow-y-auto bg-gray-100 ml-3 max-h-[30vw] w-full z-50 p-2 shadow-xl">
          {searchData?.length
            ? searchData?.map((phone: any) => {
                return (
                  <Link
                    to={`/phone/${phone?.id}/${encodeURIComponent(
                      phone?.name
                    )}`}
                    key={phone?.id}
                    className="flex items-center space-x-4"
                    onClick={() => handleSelect()}
                  >
                    <div className="p-1">
                      <div className="w-10 h-10">
                        <LazyImage
                          src={phone?.image ?? phone?.colors[0]?.images[0]}
                          alt="phone Image"
                        />
                      </div>
                    </div>
                    <div className="text-xs">
                      <h1>{phone?.name}</h1>
                      <h1 className="text-green-600">₹{phone?.salesPrice}</h1>
                    </div>
                  </Link>
                );
              })
            : null}
          {searchValue && (
            <Link
              to={`/Phones/${encodeURIComponent(searchValue)}`}
              className="flex space-x-2 p-2 items-center"
              onClick={() => handleSelect()}
            >
              <CiSearch className="mt-1" />
              <h1>{searchValue}</h1>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default DesktopSearch;
