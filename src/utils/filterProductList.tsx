export const filterProducts = (products: any, filters: any) => {
  return products.filter((product: any) => {
    if (
      filters?.connectivity &&
      !product?.specifications?.Network?.toLowerCase().includes(
        filters?.connectivity.toLowerCase()
      )
    )
      return false;

    if (
      filters?.specialOffer &&
      filters?.specialOffer !== product?.specialOffer
    ) {
      return false;
    }

    if (
      filters?.brand &&
      !filters.brand.includes(product.brand.toLowerCase())
    ) {
      return false;
    }

    if (filters?.ram && !filters.ram?.includes(product.ram)) {
      return false;
    }

    return true;
  });
};
