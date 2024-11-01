export const getDiscountPercentage = (product: any) => {
  const DiscountPercentage = Math.floor(
    ((product.mrp - product.salesPrice) /
      ((product.mrp + product.salesPrice) / 2)) *
      100
  );
  return DiscountPercentage;
};
