import { FC, useEffect, useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import SingleProductCard from "./SingleProductCard";
import { CiDiscount1 } from "react-icons/ci";
import { filterProducts } from "utils/filterProductList";
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useScreenSize } from "hooks/useScreenSize";
import { UrlReplace } from "utils/urlReplace";
import { ProductListSort } from "utils/productListSort";
import { useSearchParams } from "react-router-dom";
import ProductListFilters from "./Filters";

const ProductList: FC<any> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({
    connectivity: searchParams.get("connectivity") ?? "",
    specialOffer: searchParams.get("specialOffer") == "true" ? true : false,
    ram: searchParams.get("ram")?.split(",").map(Number) ?? [],
    brand: searchParams.get("brand")?.split(",") ?? [],
  });
  const { isMobile } = useScreenSize();
  const [productList, setProductList] = useState(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [isSortOpen, setSortIsOpen] = useState(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  console.log(filters);
  const filterAdd = (key: any, value: any) => {
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

  const handleSort = (sortValue: string) => {
    setSortIsOpen(false);
    setSort(sortValue);
    UrlReplace("sort", sortValue);
  };

  const addFilter = () => {
    Object.entries(filters)?.map((filter: any) => {
      UrlReplace(filter[0], filter[1]);
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
      <div className="w-full flex justify-between">
        <button onClick={() => setSortIsOpen(true)}>Sort</button>
        <button onClick={() => setFilterIsOpen(true)}>Filters</button>
      </div>
      {productList?.length ? (
        <div>
          {sortFilter()}
          {isFilterOpen && (
            <ProductListFilters
              isFilterOpen={isFilterOpen}
              setFilterIsOpen={setFilterIsOpen}
              setFilters={setFilters}
              filters={filters}
              addFilter={addFilter}
            />
          )}
          {/* {isMobile && ( */}
          {/* <div className=" border-t border-b  border-gray-200 p-1 ">
            <div className="flex ml-3 space-x-3 mt-3 ">
              <button
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
              </button>
              <button
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
              </button>

              <FormControl size="small">
                <Select
                  id="sort-select"
                  sx={{ fontSize: "11px" }}
                  value={sort}
                  onChange={(e) => handleSort(e.target?.value)}
                >
                  <MenuItem sx={{ fontSize: "11px" }} value={"newest"}>
                    Newest
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "11px" }} value={"HighToLow"}>
                    price -- High to Low
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "11px" }} value={"LowToHigh"}>
                    price -- Low to High
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div> */}
          {/* )} */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5">
            {productList?.length &&
              productList?.map((product: any) => {
                return (
                  <SingleProductCard product={product} key={product?.name} />
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductList;
