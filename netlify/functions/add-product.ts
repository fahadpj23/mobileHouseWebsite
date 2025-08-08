// netlify/functions/add-product.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { parse } from "lambda-multipart-parser";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  try {
    const { files, ...fields } = await parse(event);
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

    // Store images and get keys
    const imageKeys = await Promise.all(
      files.map(async (file) => {
        const key = `img-${Date.now()}-${file.filename.replace(/\s+/g, "-")}`;
        await imageStore.set(key, file.content, {
          metadata: { contentType: file.contentType },
        });
        return key;
      })
    );

    // Store product data (without binary)
    await productStore.setJSON(`prod-${Date.now()}`, {
      name: fields.name,
      description: fields.description,
      price: parseFloat(fields.price),
      category: fields.category,
      stock: parseInt(fields.stock),
      imageKeys, // Store only references
    });

    return { statusCode: 200, body: "Product added" };
  } catch (error) {
    return { statusCode: 500, body: "Error adding product" };
  }
};
