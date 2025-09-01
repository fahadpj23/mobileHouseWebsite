// utils/filterProductList.ts
export const filterProducts = (products: any[], filters: any) => {
  if (!products || products.length === 0) return [];

  return products.filter((product) => {
    // Check if product has variants
    if (!product.variants || product.variants.length === 0) return false;

    const firstVariant = product.variants[0];

    // Convert variant values to numbers for comparison
    const variantPrice = parseInt(firstVariant.price) || 0;
    const variantRam = parseInt(firstVariant.ram) || 0;
    const variantStorage = parseInt(firstVariant.storage) || 0;

    // Apply filters
    if (filters.brand && filters.brand.length > 0) {
      if (!filters.brand.includes(product.brand)) return false;
    }

    if (filters.network && filters.network.length > 0) {
      if (!filters.network.includes(product.networkType)) return false;
    }

    if (filters.ram && filters.ram.length > 0) {
      if (!filters.ram.includes(variantRam)) return false;
    }

    if (filters.storage && filters.storage.length > 0) {
      if (!filters.storage.includes(variantStorage)) return false;
    }

    if (filters.priceMin !== undefined && filters.priceMin !== null) {
      if (variantPrice < filters.priceMin) return false;
    }

    if (filters.priceMax !== undefined && filters.priceMax !== null) {
      if (variantPrice > filters.priceMax) return false;
    }

    return true;
  });
};

export const sortProducts = (products: any[], sortType: string) => {
  if (!products || products.length === 0) return [];

  return [...products].sort((a, b) => {
    const firstVariantA = a.variants[0];
    const firstVariantB = b.variants[0];

    const priceA = parseInt(firstVariantA?.price) || 0;
    const priceB = parseInt(firstVariantB?.price) || 0;

    const dateA = a.createdAt?._seconds
      ? new Date(a.createdAt._seconds * 1000)
      : new Date(0);
    const dateB = b.createdAt?._seconds
      ? new Date(b.createdAt._seconds * 1000)
      : new Date(0);

    switch (sortType) {
      case "HighToLow":
        return priceB - priceA;
      case "LowToHigh":
        return priceA - priceB;
      case "newest":
      default:
        return dateB.getTime() - dateA.getTime();
    }
  });
};
