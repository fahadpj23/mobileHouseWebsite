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

    //   if (filters.minPrice !== undefined && product.price < filters.minPrice) {
    //     return false;
    //   }

    //   if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
    //     return false;
    //   }

    //   if (filters.brand && product.brand !== filters.brand) {
    //     return false;
    //   }

    //   if (
    //     filters.minRating !== undefined &&
    //     product.rating < filters.minRating
    //   ) {
    //     return false;
    //   }

    //   if (
    //     filters.isAvailable !== undefined &&
    //     product.isAvailable !== filters.isAvailable
    //   ) {
    //     return false;
    //   }

    //   if (filters.color && product.color !== filters.color) {
    //     return false;
    //   }

    // All filters passed
    return true;
  });
};
