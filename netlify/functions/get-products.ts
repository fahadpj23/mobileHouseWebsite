// netlify/functions/get-products.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: any;
  imageKeys: string[]; // Reference to images only
}

export const handler: Handler = async () => {
  try {
    // Use separate stores
    const productStore = getStore({
      name: "products",
      siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
      token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
      consistency: "strong",
    });
    const imageStore = getStore({
      name: "product-images",
      siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
      token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
      consistency: "strong",
    });

    const { blobs } = await productStore.list();

    // Process products in parallel with Promise.all
    const products = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const product = (await productStore.get(blob.key, {
            type: "json",
          })) as Product;
          if (!product) return null;

          // Check all image metadata in parallel
          const imageChecks = await Promise.all(
            product.imageKeys.map((key) => imageStore.getMetadata(key))
          );

          const images = imageChecks.map((_, index) => ({
            url: `/.netlify/functions/get-image?key=${product.imageKeys[index]}`,
            altText: product.name,
          }));

          return {
            ...product,
            id: blob.key,
            images,
          };
        } catch (error) {
          console.error(`Error processing product ${blob.key}:`, error);
          return null;
        }
      })
    );

    // Filter out null values from failed processing
    const validProducts = products.filter(Boolean) as Product[];

    return {
      statusCode: 200,
      body: JSON.stringify(validProducts),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error in get-products:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch products" }),
    };
  }
};
