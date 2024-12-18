export const removeDuplicateSeries = (products: any) => {
  const uniqueArray: any = [];
  products?.length &&
    products.forEach((product: any) => {
      if (!uniqueArray.some((item: any) => item.series === product.series)) {
        uniqueArray.push(product);
      }
    });
  return uniqueArray;
};
