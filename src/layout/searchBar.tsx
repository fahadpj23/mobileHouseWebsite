import { FC, useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Divider } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { debounce } from "lodash";

import { toPascalCase } from "utils/pascalCaseConvert";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchSearchProducts } from "store/slice/productSlice";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";

interface SearchBarProps {
  setSearchOpen: (open: boolean) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setSearchOpen }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { searchProduct, loading } = useAppSelector(
    (state) => state.user.products
  );

  // Memoized debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchSearchProducts(searchTerm));
      }
    }, 200),
    [dispatch]
  );

  const handleSearch = useCallback(
    (search: string) => {
      setSearchValue(search);
      debouncedSearch(search);
    },
    [debouncedSearch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Memoize search results
  const searchResults = useMemo(
    () => (Array.isArray(searchProduct) ? searchProduct : []),
    [searchProduct]
  );

  // Memoize product URL generation
  const getProductUrl = useCallback((product: any) => {
    if (!product?.id) return "#";

    const variantId = product.variants?.[0]?.id || "";
    const colorId = product.colors?.[0]?.id || "";
    const productName = product.productName
      ? encodeURIComponent(product.productName)
      : "";

    return `/phone/${product.id}/${variantId}/${colorId}/${productName}`;
  }, []);

  // Memoize rendered search results
  const renderedSearchResults = useMemo(
    () =>
      searchResults.map((product: any) => {
        const productUrl = getProductUrl(product);
        const imageUrl = product.colors?.[0]?.images?.[0]?.url;
        const productName = product.productName
          ? toPascalCase(product.productName)
          : "";
        const price = product.variants?.[0]?.price || "";

        return (
          <Link
            onClick={() => setSearchOpen(false)}
            to={productUrl}
            key={product.id}
            className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded"
          >
            <div className="p-1">
              <div className="w-8 h-10">
                <ServerLazyImage
                  src={imageUrl}
                  alt={`${productName} product image`}
                />
              </div>
            </div>
            <div className="text-xs space-y-1">
              <h1 className="font-medium">{productName}</h1>
              <h1 className="text-green-600 tracking-wide">₹{price}</h1>
            </div>
          </Link>
        );
      }),
    [searchResults, getProductUrl, setSearchOpen]
  );

  const hasSearchResults = searchResults.length > 0;
  const hasSearchValue = searchValue.trim().length > 0;

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-screen bg-white z-40 flex flex-col">
      {/* Search Header */}
      <div className="flex items-center w-full p-3 border-b">
        <SearchOutlinedIcon sx={{ color: "#0e86d4" }} />
        <input
          autoFocus
          placeholder="Search here..."
          className="focus:outline-none flex-1 ml-2"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Divider />

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div>
            {[...Array(3)].map((item, key) => {
              return (
                <div className="flex items-center space-x-3 p-2 rounded transition-colors animate-pulse">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded"></div>
                  <div className="text-xs min-w-0 flex-1 space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : hasSearchResults ? (
          <div className="divide-y">{renderedSearchResults}</div>
        ) : hasSearchValue ? (
          <div className="p-4 text-center text-gray-500">
            No results found for "{searchValue}"
          </div>
        ) : null}

        {hasSearchValue && !hasSearchResults && (
          <Link
            to={`/Phones/${encodeURIComponent(searchValue)}`}
            className="flex items-center space-x-2 p-4 hover:bg-gray-50"
            onClick={() => setSearchOpen(false)}
          >
            <CiSearch className="text-gray-600" />
            <span>Search for "{searchValue}"</span>
          </Link>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-3 border-t bg-white">
        <button
          onClick={() => setSearchOpen(false)}
          className="border-2 border-blue-600 bg-white text-blue-600 text-center p-3 w-full rounded hover:bg-blue-50 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
