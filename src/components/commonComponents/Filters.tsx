import { Checkbox, Drawer, FormControlLabel, FormGroup } from "@mui/material";
import { FC, useState } from "react";
import { PHONEBRANDS } from "constants/phoneBrands";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getBrandFromList } from "utils/getBrandFromList";
import { productFilters } from "constants/filter/productFilters";
import { RamVariant } from "constants/filter/ramVariant";
import { InternalStorageVariant } from "constants/filter/internalStorage";
import { networkType } from "constants/filter/networkType";

interface props {
  isFilterOpen: Boolean;
  setFilterIsOpen: any;
  filters: any;
  addFilter: any;
  products: any;
}
const ProductListFilters: FC<props> = ({
  isFilterOpen,
  setFilterIsOpen,
  filters,
  addFilter,
  products,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("brand");
  const [selectedProductFilters, setSelectedProductFilters] =
    useState<any>(filters);
  // const rangeSliderMinMax = getHighestAndLowestPrice(products);
  const [price, setPrice] = useState({
    min: filters?.priceMin ?? 0,
    max: filters?.priceMax ?? 150000,
  });

  const handleFilter = (event: any, value: any) => {
    const { checked } = event.target;
    setSelectedProductFilters({
      ...filters,
      [selectedFilter]: Boolean(checked)
        ? [...selectedProductFilters[selectedFilter], value]
        : selectedProductFilters[selectedFilter]?.filter(
            (item: any) => item !== value
          ),
    });
  };

  const ApplyFilters = () => {
    addFilter(selectedProductFilters);
  };

  const handleChange = (value: any) => {
    setPrice({
      min: value[0],
      max: value[1],
    });
    setSelectedProductFilters({
      ...selectedProductFilters,
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const checkBoxList = (list: any) => (
    <div className="p-2">
      <FormGroup>
        {list?.map((item: any) => {
          return (
            <FormControlLabel
              key={item?.value}
              control={
                <Checkbox
                  size="small"
                  value={item?.value}
                  checked={selectedProductFilters[selectedFilter]?.includes(
                    item?.value
                  )}
                />
              }
              onChange={(e) => handleFilter(e, item?.value)}
              label={item?.name}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "13px",
                },
              }}
            />
          );
        })}
      </FormGroup>
    </div>
  );

  const priceSlider = () => (
    <div className="p-4 flex flex-col space-y-4">
      <h1 className="font-semibold">PRICE</h1>
      <div className="flex flex-col space-y-3">
        <Slider
          range
          defaultValue={[
            selectedProductFilters?.priceMin ?? 0,
            selectedProductFilters?.priceMax ?? 150000,
          ]}
          min={0}
          max={200000}
          step={1}
          onChange={handleChange}
        />
        <h1 className="font-serif ">
          ₹ {price?.min} - ₹ {price?.max}
        </h1>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <Drawer
          anchor="bottom"
          className="relative"
          open={Boolean(isFilterOpen)}
          onClose={() => setFilterIsOpen(false)}
          PaperProps={{
            sx: { height: "90vh" },
          }}
        >
          <div className="flex h-full  ">
            <div className="w-1/3 flex flex-col space-y-5 items-start bg-gray-100 h-full p-2 ">
              {productFilters?.map((filter) => {
                return (
                  <button
                    key={filter?.value}
                    className="font-semibold"
                    onClick={() => setSelectedFilter(filter?.value)}
                  >
                    {filter?.name}
                  </button>
                );
              })}
            </div>
            <div className="w-2/3 flex flex-col justify-between h-full">
              <>
                {(() => {
                  switch (selectedFilter) {
                    case "brand":
                      return checkBoxList(getBrandFromList(products));
                    case "ram":
                      return checkBoxList(RamVariant);
                    case "storage":
                      return checkBoxList(InternalStorageVariant);
                    case "network":
                      return checkBoxList(networkType);
                    case "price":
                      return priceSlider();
                    // case "rating":
                    //   return checkBoxList(starRating);
                    // default:
                    //   return <div style={{ color: "gray" }}>Default Message</div>;
                  }
                })()}
              </>
              <button
                onClick={ApplyFilters}
                className="bg-orange-600 p-1 w-[60%] text-white absolute bottom-1 right-1"
              >
                Apply
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default ProductListFilters;
