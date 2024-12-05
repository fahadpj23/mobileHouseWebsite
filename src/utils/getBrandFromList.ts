export const getBrandFromList = (productList: any) => {
  const BrandList = Array.from(
    new Set(productList.map((product: any) => product.brand))
  );
  const filterBrandObject = BrandList.map((brand) => ({
    name: brand,
    value: brand,
  }));
  return filterBrandObject;
};
