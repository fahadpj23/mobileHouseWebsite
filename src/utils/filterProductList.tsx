export const filterProducts = (products: any, filters: any) => {
  return products.filter((product: any) => {
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
      filters?.network?.length &&
      !filters.network?.includes(product.networkType)
    ) {
      return false;
    }

    if (
      (filters.priceMin && product.salesPrice < Number(filters.priceMin)) ||
      (filters.priceMax && product.salesPrice > Number(filters.priceMax))
    ) {
      return false;
    }

    return true;
  });
};
