import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import LazyImage from "components/commonComponents/imageLazyLoading";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchSearchProducts } from "store/slice/productSlice";
import { debounce } from "lodash";

const DesktopSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { searchProduct } = useAppSelector((state) => state.user.products);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchSearchProducts(searchTerm));
      }
    }, 500), // 500ms delay
    [dispatch]
  );

  const handleSearch = (search: string) => {
    setSearchValue(search);
    debouncedSearch(search);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSelect = () => {
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
          {Array.isArray(searchProduct)
            ? searchProduct?.map((product: any) => {
                return (
                  <Link
                    to={`/phone/${product?.id}/${
                      Array.isArray(product?.variants) &&
                      product?.variants[0]?.id
                    }/${
                      Array.isArray(product?.colors) && product?.colors[0]?.id
                    }/${encodeURIComponent(product?.productName)}`}
                    key={product?.id}
                    className="flex items-center space-x-4"
                    onClick={() => handleSelect()}
                  >
                    <div className="p-1">
                      <div className="w-10 h-10">
                        <LazyImage
                          src={
                            product?.image ?? product?.colors[0]?.images[0]?.url
                          }
                          alt="product Image"
                        />
                      </div>
                    </div>
                    <div className="text-xs">
                      <h1>{product?.productName}</h1>
                      <h1 className="text-green-600">
                        {" "}
                        ₹{product?.variants[0].price}
                      </h1>
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
