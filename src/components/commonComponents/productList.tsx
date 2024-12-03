import { FC, useEffect, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import SingleProductCard from "./SingleProductCard";
import { filterProducts } from "utils/filterProductList";
import { GiNetworkBars } from "react-icons/gi";
import { CiDiscount1 } from "react-icons/ci";
import NOPRODUCTIMAGE from "assets/noProduct.jpg";
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  // Select,
} from "@mui/material";
// import { useScreenSize } from "hooks/useScreenSize";
import { UrlReplace } from "utils/urlReplace";
import { ProductListSort } from "utils/productListSort";
import { useSearchParams } from "react-router-dom";
import ProductListFilters from "./Filters";

const ProductList: FC<any> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({
    networkType: searchParams.get("networkType")
      ? searchParams.get("networkType")
      : [],
    // specialOffer: searchParams.get("specialOffer") == "true" ? true : false,
    ram: searchParams.get("ram")
      ? searchParams.get("ram")?.split(",").map(Number)
      : [],
    storage: searchParams.get("storage")
      ? searchParams.get("storage")?.split(",").map(Number)
      : [],
    brand: searchParams.get("brand")?.split(",") ?? [],
  });
  // const { isMobile } = useScreenSize();
  const [productList, setProductList] = useState(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [isSortOpen, setSortIsOpen] = useState(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);

  // const filterAdd = (key: any, value: any) => {
  //   UrlReplace(key, value);
  //   setIsLoading(true);
  //   setFilters({ ...filters, [key]: value });
  // };

  useEffect(() => {
    if (products) {
      const filteredProducts: any = filterProducts(products, filters);
      setProductList(filteredProducts);
    }
  }, [filters]);

  useEffect(() => {
    isLoading &&
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
  }, [isLoading]);

  useEffect(() => {
    setFilters({
      networkType: searchParams.get("networkType")
        ? searchParams.get("networkType")
        : [],
      ram: searchParams.get("ram")
        ? searchParams.get("ram")?.split(",").map(Number)
        : [],
      storage: searchParams.get("storage")
        ? searchParams.get("storage")?.split(",").map(Number)
        : [],
      brand: searchParams.get("brand")?.split(",") ?? [],
    });
    setIsLoading(true);
  }, [searchParams]);

  const handleSort = (sortValue: string) => {
    setSortIsOpen(false);
    setSort(sortValue);
    UrlReplace("sort", sortValue);
  };

  const addFilter = (selectedProductFilters: any) => {
    Object.entries(selectedProductFilters)?.map((filter: any) => {
      UrlReplace(filter[0], filter[1]);
    });
    setFilters({
      ...filters,
      storage: selectedProductFilters?.storage,
      ram: selectedProductFilters?.ram,
      brand: selectedProductFilters?.brand,
      networkType: selectedProductFilters?.networkType,
    });
    setFilterIsOpen(false);
    setIsLoading(true);
  };

  useEffect(() => {
    setProductList(ProductListSort(productList, sort));
    setIsLoading(true);
  }, [sort]);

  const sortFilter = () => (
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
  );

  return (
    <div className="mt-4">
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-screen z-50 bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full flex justify-between   border-t border-b border-gray-300 py-2 my-2">
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

      <div>
        {sortFilter()}
        {isFilterOpen && (
          <ProductListFilters
            isFilterOpen={isFilterOpen}
            setFilterIsOpen={setFilterIsOpen}
            filters={filters}
            addFilter={addFilter}
            products={products}
          />
        )}
        {/* 
        <div className=" border-t border-b  border-gray-200 p-1 ">
          <div className="flex ml-3 space-x-3 mt-3 "> */}
        {/* <button
              onClick={() => {
                filters?.connectivity
                  ? filterAdd("connectivity", "")
                  : filterAdd("connectivity", "5G");
              }}
              className={`flex space-x-1 justify-end items-center  w-12 p-1 rounded-sm ${
                filters?.connectivity
                  ? "border border-blue-600 bg-blue-100"
                  : "border border-gray-400"
              }`}
            >
              <GiNetworkBars className="text-blue-500 text-xl" />
              <h1 className="text-[10px]">5G</h1>
            </button> */}
        {/* <button
              onClick={() => {
                filters?.specialOffer
                  ? filterAdd("specialOffer", false)
                  : filterAdd("specialOffer", true);
              }}
              className={`flex justify-center items-center  p-1 rounded-sm ${
                filters?.specialOffer
                  ? "border border-green-600 bg-green-100"
                  : "border border-gray-400"
              }`}
            >
              <CiDiscount1 className="text-green-500 text-xl" />
              <h1 className="text-[10px]">Special Offer</h1>
            </button> */}
        {/* </div>
        </div> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5">
          {productList?.length ? (
            productList?.map((product: any) => {
              return (
                <SingleProductCard product={product} key={product?.name} />
              );
            })
          ) : (
            <div className="w-screen h-full flex items-center justify-center ">
              <img
                src={NOPRODUCTIMAGE}
                className="w-[60vw] md:w-[40vh] h-[40vh] "
                alt="nocproduct found"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
