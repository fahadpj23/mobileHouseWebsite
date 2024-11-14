export const ProductListSort = (productList: any, sortValue: any) => {
  if (sortValue === "newest") {
    const products = productList?.sort((a: any, b: any) => {
      const numA = parseInt(a.id.match(/\d+/)[0], 10);
      const numB = parseInt(b.id.match(/\d+/)[0], 10);
      return numA - numB;
    });
    return products;
  } else if (sortValue === "HighToLow") {
    return productList?.sort((a: any, b: any) => b.salesPrice - a.salesPrice);
  } else {
    return productList?.sort((a: any, b: any) => a.salesPrice - b.salesPrice);
  }
};
