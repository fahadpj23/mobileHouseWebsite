import { Checkbox, Drawer, FormControlLabel, FormGroup } from "@mui/material";
import { FC, useState } from "react";
import { PHONEBRANDS } from "constants/phoneBrands";
import { UrlReplace } from "utils/urlReplace";

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
  ];

  const starRating = [
    { name: "4* Above", value: 4 },
    { name: "3* Above", value: 3 },
  ];

  const productFilters = [
    { name: "Brand", value: "brand" },
    { name: "Ram", value: "ram" },
    // { name: "Rating", value: "rating" },
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
    setSelectedProductFilters({
      ...filters,
      ram: selectedProductFilters?.ram,
      brand: selectedProductFilters?.brand,
    });
    addFilter();
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
