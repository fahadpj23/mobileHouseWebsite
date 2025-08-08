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
    const products: Product[] = [];

    for (const blob of blobs) {
      try {
        // Only get JSON from product store
        const product = (await productStore.get(blob.key, {
          type: "json",
        })) as Product;

        if (product) {
          // Verify images exist without loading binary data
          const images = await Promise.all(
            product.imageKeys.map(async (key) => {
              const exists = await imageStore.getMetadata(key);
              return {
                url: `/.netlify/functions/get-image?key=${key}`,
                altText: product.name,
              };
            })
          );

          products.push({
            ...product,
            id: blob.key,
            images,
          });
        }
      } catch (error) {
        console.error(`Error processing product ${blob.key}:`, error);
        continue;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch products" }),
    };
  }
};
