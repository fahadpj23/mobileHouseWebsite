import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { BsSortDown } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import SingleProductCard from "./singleProductCard";
import { filterProducts } from "utils/filterProductList";
import NOPRODUCTIMAGE from "assets/noProduct.jpg";
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { UrlReplace } from "utils/urlReplace";
import { useSearchParams } from "react-router-dom";
import ProductListFilters from "./filters";
import { useScreenSize } from "hooks/useScreenSize";
import DesktopFilter from "./desktopFilters";
import LazyImage from "./imageLazyLoading";
import SingleProductSkeleton from "components/skeleton/singleProductSkeleton";

const ProductList: FC<any> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useScreenSize();

  // Memoize initial filter values
  const filterInitialValue = useMemo(
    () => ({
      network: searchParams.get("network") || [],
      ram: searchParams.get("ram")
        ? searchParams.get("ram")?.split(",").map(Number)
        : [],
      storage: searchParams.get("storage")
        ? searchParams.get("storage")?.split(",").map(Number)
        : [],
      brand: searchParams.get("brand")
        ? searchParams.get("brand")?.split(",")
        : [],
      priceMin: searchParams.get("priceMin")
        ? Number(searchParams.get("priceMin"))
        : 0,
      priceMax: searchParams.get("priceMax")
        ? Number(searchParams.get("priceMax"))
        : 150000,
    }),
    [searchParams]
  );

  const [filters, setFilters] = useState<any>(filterInitialValue);
  const [productList, setProductList] = useState(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [isSortOpen, setSortIsOpen] = useState(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);

  // Memoize filtered products
  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  // Optimize filter updates
  const desktopFilterAdd = useCallback((key: any, value: any) => {
    UrlReplace(key, value);
    setIsLoading(true);
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  // Debounced loading state
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Update product list when filters or products change
  useEffect(() => {
    setProductList(filteredProducts);
  }, [filteredProducts]);

  // Handle URL parameter changes
  useEffect(() => {
    setFilters(filterInitialValue);
    setIsLoading(true);
  }, [filterInitialValue]);

  const handleSort = useCallback((sortValue: string) => {
    setSortIsOpen(false);
    setSort(sortValue);
    UrlReplace("sort", sortValue);
    setIsLoading(true);
  }, []);

  const addFilter = useCallback((selectedProductFilters: any) => {
    Object.entries(selectedProductFilters)?.forEach((filter: any) => {
      UrlReplace(filter[0], filter[1]);
    });

    setFilters((prev: any) => ({
      ...prev,
      storage: selectedProductFilters?.storage,
      ram: selectedProductFilters?.ram,
      brand: selectedProductFilters?.brand,
      network: selectedProductFilters?.network,
      priceMin: selectedProductFilters?.priceMin,
      priceMax: selectedProductFilters?.priceMax,
    }));

    setFilterIsOpen(false);
    setIsLoading(true);
  }, []);

  // Memoize sort filter drawer
  const sortFilter = useMemo(
    () => (
      <Drawer
        anchor="bottom"
        open={isSortOpen}
        onClose={() => setSortIsOpen(false)}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#f5f5f5",
            overflow: "auto",
          }}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={sort}
              name="radio-buttons-group"
              onChange={(e) => handleSort(e.target?.value)}
            >
              <FormControlLabel
                value={"newest"}
                control={<Radio size="small" />}
                label="Newest"
              />
              <FormControlLabel
                value={"HighToLow"}
                control={<Radio size="small" />}
                label=" price -- High to Low"
              />
              <FormControlLabel
                value={"LowToHigh"}
                control={<Radio size="small" />}
                label=" price -- Low to High"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Drawer>
    ),
    [isSortOpen, sort, handleSort]
  );

  // Memoize skeleton array
  const skeletonArray = useMemo(() => [...Array(5)], []);

  // Memoize product cards
  const productCards = useMemo(
    () =>
      productList?.map((product: any) => (
        <SingleProductCard
          product={product}
          key={product?.id || product?.name}
        />
      )),
    [productList]
  );

  return (
    <div className="mt-4">
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 animate-pulse">
          {skeletonArray.map((_, index) => (
            <SingleProductSkeleton key={index} />
          ))}
        </div>
      )}

      {isMobile && (
        <div className="w-full flex justify-between border-t border-b border-gray-300 py-2 my-2">
          <button
            className="flex justify-center w-1/2 border-r border-gray-300 items-center font-semibold space-x-1"
            onClick={() => setSortIsOpen(true)}
          >
            <BsSortDown />
            <h1>Sort</h1>
          </button>
          <button
            className="flex justify-center w-1/2 items-center font-semibold space-x-1"
            onClick={() => setFilterIsOpen(true)}
          >
            <CiFilter />
            <h1>Filters</h1>
          </button>
        </div>
      )}

      <div>
        {sortFilter}

        {isFilterOpen && (
          <ProductListFilters
            isFilterOpen={isFilterOpen}
            setFilterIsOpen={setFilterIsOpen}
            filters={filters}
            addFilter={addFilter}
            products={products}
          />
        )}

        <div className="flex">
          {!isMobile && (
            <div className="w-[15vw] bg-gray-100 shadow-xl p-1 overflow-y-auto">
              <DesktopFilter
                filters={filters}
                desktopFilterAdd={desktopFilterAdd}
                products={products}
                setFilters={setFilters}
              />
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5 w-full justify-between">
            {productList?.length ? (
              productCards
            ) : (
              <div className="w-screen md:w-auto h-full flex justify-center col-span-full">
                <div className="w-[80%] md:w-full h-[40vh]">
                  <LazyImage src={NOPRODUCTIMAGE} alt="no product found" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
