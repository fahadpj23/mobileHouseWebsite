export const getHighestAndLowestPrice = (products: any) => {
  const result = products.reduce(
    (acc: any, product: any) => {
      if (product.salesPrice > acc.highest.salesPrice) {
        acc.highest = product;
      }
      if (product.salesPrice < acc.lowest.salesPrice) {
        acc.lowest = product;
      }
      return acc;
    },
    {
      highest: products[0],
      lowest: products[0],
    }
  );
  return {
    highest: result?.highest?.salesPrice,
    lowest: result?.lowest?.salesPrice,
  };
};
