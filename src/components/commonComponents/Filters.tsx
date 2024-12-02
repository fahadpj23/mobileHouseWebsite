import { Checkbox, Drawer, FormControlLabel, FormGroup } from "@mui/material";
import { FC, useState } from "react";
import { PHONEBRANDS } from "constants/phoneBrands";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface props {
  isFilterOpen: Boolean;
  setFilterIsOpen: any;
  setFilters: any;
  filters: any;
  addFilter: any;
}
const ProductListFilters: FC<props> = ({
  isFilterOpen,
  setFilterIsOpen,
  setFilters,
  filters,
  addFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("brand");
  const [selectedProductFilters, setSelectedProductFilters] =
    useState<any>(filters);
  const RamVariant = [
    { name: 4, value: 4 },
    { name: 6, value: 6 },
    { name: 8, value: 8 },
    { name: 12, value: 12 },
  ];

  const InternalStorageVariant = [
    { name: "32 Gb", value: 32 },
    { name: "64 Gb", value: 64 },
    { name: "128 Gb", value: 128 },
    { name: "512 Gb", value: 512 },
    { name: "1 Tb", value: 1000 },
  ];

  const networkType = [
    { name: "4G", value: "4G" },
    { name: "5G", value: "5G" },
  ];

  const productFilters = [
    { name: "Brand", value: "brand" },
    { name: "Ram", value: "ram" },
    { name: "storage", value: "storage" },
    { name: "network Type", value: "networkType" },
    { name: "price", value: "price" },
  ];

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
    <div className="p-4 flex flex-col space-y-2">
      <h1 className="font-semibold">PRICE</h1>
      <Slider range defaultValue={[20, 50]} min={0} max={100} step={1} />
    </div>
  );

  return (
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
                    return checkBoxList(PHONEBRANDS);
                  case "ram":
                    return checkBoxList(RamVariant);
                  case "storage":
                    return checkBoxList(InternalStorageVariant);
                  case "networkType":
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
              className="bg-orange-600 p-1 w-[60%] text-white absolute bottom-0 right-1"
            >
              Apply
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default ProductListFilters;
