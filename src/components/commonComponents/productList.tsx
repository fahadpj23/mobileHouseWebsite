import { FC, useEffect, useState } from "react";
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
  // Select,
} from "@mui/material";
import { UrlReplace } from "utils/urlReplace";
import { ProductListSort } from "utils/productListSort";
import { useSearchParams } from "react-router-dom";
import ProductListFilters from "./filters";
import { useScreenSize } from "hooks/useScreenSize";
import DesktopFilter from "./desktopFilters";

const ProductList: FC<any> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useScreenSize();
  const [filters, setFilters] = useState<any>({
    network: searchParams.get("network") ? searchParams.get("network") : [],
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
  });
  const [productList, setProductList] = useState(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [isSortOpen, setSortIsOpen] = useState(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);

  const desktopFilterAdd = (key: any, value: any) => {
    UrlReplace(key, value);
    setIsLoading(true);
    setFilters({ ...filters, [key]: value });
  };

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
      network: searchParams.get("network") ? searchParams.get("network") : [],
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
      network: selectedProductFilters?.network,
      priceMin: selectedProductFilters?.priceMin,
      priceMax: selectedProductFilters?.priceMax,
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
      {isMobile && (
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
      )}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5">
            {productList?.length ? (
              productList?.map((product: any) => {
                return (
                  <SingleProductCard product={product} key={product?.name} />
                );
              })
            ) : (
              <div className="w-screen md:w-auto  h-full flex  justify-center ">
                <img
                  src={NOPRODUCTIMAGE}
                  className="w-[80%] md:w-full  h-[40vh] "
                  alt="nocproduct found"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
