import { productFilters } from "constants/filter/productFilters";
import { RamVariant } from "constants/filter/ramVariant";
import { InternalStorageVariant } from "constants/filter/internalStorage";
import { networkType } from "constants/filter/networkType";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC } from "react";
import { getBrandFromList } from "utils/getBrandFromList";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface props {
  filters: any;
  desktopFilterAdd: any;
  products: any;
  setFilters: any;
}
const DesktopFilter: FC<props> = ({
  filters,
  desktopFilterAdd,
  products,
  setFilters,
}) => {
  const checkBoxList = (listName: string, list: any) => (
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
                  checked={
                    filters[listName] &&
                    filters[listName]?.includes(item?.value)
                  }
                />
              }
              onChange={(e) =>
                desktopFilterAdd(listName, [...filters[listName], item?.value])
              }
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

  const handleChange = (value: any) => {
    setFilters({
      ...filters,
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const priceSlider = () => (
    <div className="p-4 flex flex-col space-y-4">
      <h1 className="font-semibold">PRICE</h1>
      <div className="flex flex-col space-y-3">
        <Slider
          range
          defaultValue={[filters?.priceMin ?? 0, filters?.priceMax ?? 150000]}
          min={0}
          max={200000}
          step={1}
          onChangeComplete={handleChange}
        />
        <h1 className="font-serif ">
          ₹ {filters?.priceMin} - ₹ {filters?.priceMax}
        </h1>
      </div>
    </div>
  );

  const filterListFetch = (filterName: string) => {
    switch (filterName) {
      case "brand":
        return getBrandFromList(products);
      case "ram":
        return RamVariant;
      case "storage":
        return InternalStorageVariant;
      case "network":
        return networkType;
    }
  };

  const filterDetails = (title: string, listName: any) => (
    <div>
      <h1 className="uppercase font-semibold">{title}</h1>
      {listName === "price"
        ? priceSlider()
        : checkBoxList(listName, filterListFetch(listName))}
    </div>
  );

  return (
    <div>
      {productFilters?.map((filter) => {
        return <div>{filterDetails(filter?.name, filter?.value)}</div>;
      })}
    </div>
  );
};
export default DesktopFilter;
