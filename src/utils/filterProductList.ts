export const filterProducts = (products: any[], filters: any) => {
  if (!products || products.length === 0) return [];

  return products
    .filter((product) => {
      // Check if product has variants
      if (!product.variants || product.variants.length === 0) return false;

      // Check if ANY variant matches all the filters
      return product.variants.some((variant: any) => {
        // Convert variant values to numbers for comparison
        const variantPrice = parseInt(variant.price) || 0;
        const variantRam = parseInt(variant.ram) || 0;
        const variantStorage = parseInt(variant.storage) || 0;

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
    })
    .map((product) => {
      // For each product that has at least one matching variant,
      // create a new product object with only the matching variants
      const matchingVariants = product.variants.filter((variant: any) => {
        const variantPrice = parseInt(variant.price) || 0;
        const variantRam = parseInt(variant.ram) || 0;
        const variantStorage = parseInt(variant.storage) || 0;

        // Apply the same filter logic to individual variants
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

      // Return a new product object with only the matching variants
      return {
        ...product,
        variants: matchingVariants,
      };
    });
};
