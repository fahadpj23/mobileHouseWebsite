export const getDiscountPercentage = (price: any, mrp: any) => {
  const DiscountPercentage = Math.floor(
    ((mrp - price) / ((mrp + price) / 2)) * 100
  );
  return DiscountPercentage;
};
