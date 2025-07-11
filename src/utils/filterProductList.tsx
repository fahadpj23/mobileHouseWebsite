export const filterProducts = (products: any, filters: any) => {
  return products.filter((product: any) => {
    if (filters?.brand?.length && !filters.brand.includes(product.brand)) {
      return false;
    }

    if (
      filters?.ram?.length &&
      !filters.ram?.includes(product.variants[0].ram)
    ) {
      return false;
    }

    if (
      filters?.storage?.length &&
      !filters.storage?.includes(product.variants[0].storage)
    ) {
      return false;
    }

    if (
      filters?.network?.length &&
      !filters.network?.includes(product.networkType)
    ) {
      return false;
    }

    if (
      (filters.priceMin &&
        product.variants[0].price < Number(filters.priceMin)) ||
      (filters.priceMax && product.variants[0].price > Number(filters.priceMax))
    ) {
      return false;
    }

    return true;
  });
};
