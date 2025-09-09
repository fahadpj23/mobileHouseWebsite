import { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { debounce } from "lodash";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchSearchProducts } from "store/slice/productSlice";

const DesktopSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { searchProduct, loading } = useAppSelector(
    (state) => state.user.products
  );

  // Memoized search results
  const searchResults = useMemo(
    () => (Array.isArray(searchProduct) ? searchProduct : []),
    [searchProduct]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchSearchProducts(searchTerm));
      }
    }, 100),
    [dispatch]
  );

  const handleSearch = useCallback(
    (search: string) => {
      setSearchValue(search);
      debouncedSearch(search);
    },
    [debouncedSearch]
  );

  const handleSelect = useCallback(() => {
    setSearchValue("");
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
        const imageUrl =
          product?.image ?? product?.colors?.[0]?.images?.[0]?.url;
        const productName = product?.productName || "";
        const price = product?.variants?.[0]?.price || "";

        return (
          <Link
            to={getProductUrl(product)}
            key={product.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded transition-colors"
            onClick={handleSelect}
          >
            <div className="w-10 h-10 flex-shrink-0">
              <LazyImage src={imageUrl} alt={`${productName} product image`} />
            </div>
            <div className="text-xs min-w-0 flex-1">
              <h1 className="font-medium truncate">{productName}</h1>
              <h1 className="text-green-600 font-semibold">₹{price}</h1>
            </div>
          </Link>
        );
      }),
    [searchResults, getProductUrl, handleSelect]
  );

  const hasSearchValue = searchValue.trim().length > 0;
  const hasSearchResults = searchResults.length > 0;

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[22vw] justify-between focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
        <input
          value={searchValue}
          placeholder="Search here..."
          className="focus:outline-none w-full bg-transparent"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <SearchOutlinedIcon sx={{ color: "#808080", fontSize: 20 }} />
      </div>

      {hasSearchValue && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
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
            <div className="py-2">{renderedSearchResults}</div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No results found
            </div>
          )}

          <Link
            to={`/Phones/${encodeURIComponent(searchValue)}`}
            className="flex items-center space-x-2 p-3 border-t border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={handleSelect}
          >
            <CiSearch className="text-gray-600" />
            <span className="text-sm">Search for "{searchValue}"</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesktopSearch;
