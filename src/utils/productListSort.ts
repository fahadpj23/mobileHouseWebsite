export const ProductListSort = (productList: any, sortValue: any) => {
  if (sortValue === "newest") {
    // const products = productList?.sort((a:any, b:any) => new Date(a.launchDate) - new Date(b.launchDate));
    const products = productList.sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.launchDate.split("-").map(Number);
      const [dayB, monthB, yearB] = b.launchDate.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return dateB - dateA;
    });
    return products;
  } else if (sortValue === "HighToLow") {
    return productList?.sort((a: any, b: any) => b.salesPrice - a.salesPrice);
  } else {
    return productList?.sort((a: any, b: any) => a.salesPrice - b.salesPrice);
  }
};
