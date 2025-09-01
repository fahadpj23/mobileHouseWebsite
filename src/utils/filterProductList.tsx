// utils/filterProductList.ts
export const filterProducts = (products: any[], filters: any) => {
  if (!products || products.length === 0) return [];

  // Extract only filter properties, exclude sort
  const { sort: _, ...filterParams } = filters;

  return products.filter((product) => {
    // Check if product has variants
    if (!product.variants || product.variants.length === 0) return false;

    const firstVariant = product.variants[0];

    // Convert variant values to numbers for comparison
    const variantPrice = parseInt(firstVariant.price) || 0;
    const variantRam = parseInt(firstVariant.ram) || 0;
    const variantStorage = parseInt(firstVariant.storage) || 0;

    // Apply filters
    if (filterParams.brand && filterParams.brand.length > 0) {
      if (!filterParams.brand.includes(product.brand)) return false;
    }

    if (filterParams.network && filterParams.network.length > 0) {
      if (!filterParams.network.includes(product.networkType)) return false;
    }

    if (filterParams.ram && filterParams.ram.length > 0) {
      if (!filterParams.ram.includes(variantRam)) return false;
    }

    if (filterParams.storage && filterParams.storage.length > 0) {
      if (!filterParams.storage.includes(variantStorage)) return false;
    }

    if (filterParams.priceMin !== undefined && filterParams.priceMin !== null) {
      if (variantPrice < filterParams.priceMin) return false;
    }

    if (filterParams.priceMax !== undefined && filterParams.priceMax !== null) {
      if (variantPrice > filterParams.priceMax) return false;
    }

    return true;
  });
};
