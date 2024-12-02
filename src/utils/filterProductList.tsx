export const filterProducts = (products: any, filters: any) => {
  return products.filter((product: any) => {
    // if (
    //   filters?.connectivity &&
    //   !product?.specifications?.Network?.toLowerCase().includes(
    //     filters?.connectivity.toLowerCase()
    //   )
    // )
    //   return false;

    // if (
    //   filters?.specialOffer &&
    //   filters?.specialOffer !== product?.specialOffer
    // ) {
    //   return false;
    // }

    if (
      filters?.brand?.length &&
      !filters.brand.includes(product.brand.toLowerCase())
    ) {
      return false;
    }

    if (filters?.ram?.length && !filters.ram?.includes(product.ram)) {
      return false;
    }

    if (
      filters?.storage?.length &&
      !filters.storage?.includes(product.storage)
    ) {
      return false;
    }

    if (
      filters?.networkType?.length &&
      !filters.networkType?.includes(product.networkType)
    ) {
      return false;
    }

    return true;
  });
};
