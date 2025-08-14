import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Divider } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import LazyImage from "components/commonComponents/imageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchSearchProducts } from "store/slice/productSlice";

const SearchBar: FC<any> = ({ setSearchOpen }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { searchProduct } = useAppSelector((state) => state.user.products);

  const handleSearch = (search: any) => {
    setSearchValue(search);
    dispatch(fetchSearchProducts(search));
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
        {Array.isArray(searchProduct) &&
          searchProduct?.map((product: any) => {
            return (
              <Link
                onClick={() => setSearchOpen(false)}
                to={`/phone/${product?.id}/${
                  Array.isArray(product?.variants) && product?.variants[0]?.id
                }/${
                  Array.isArray(product?.colors) && product?.colors[0]?.id
                }/${encodeURIComponent(product?.productName)}`}
                key={product?.id}
                className="flex items-center space-x-4"
              >
                <div className="p-1">
                  <div className="w-8 h-10">
                    <LazyImage
                      src={product?.colors[0]?.images[0].url}
                      alt="product Image"
                    />
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <h1>
                    {product?.productName && toPascalCase(product?.productName)}
                  </h1>
                  <h1 className="text-green-600 tracking-wide">
                    ₹{product?.variants[0].price}
                  </h1>
                </div>
              </Link>
            );
          })}
        {searchValue && (
          <Link
            to={`/products/${encodeURIComponent(searchValue)}`}
            className="flex space-x-2 p-2 items-center"
            onClick={() => setSearchOpen(false)}
          >
            <CiSearch className="mt-1" />
            <h1>{searchValue}</h1>
          </Link>
        )}
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
