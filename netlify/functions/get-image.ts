// netlify/functions/get-image.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

interface BlobMetadata {
  contentType?: string;
  [key: string]: unknown;
}

export const handler: Handler = async (event) => {
  const { key } = event.queryStringParameters || {};
  if (!key) return { statusCode: 400 };
  const getBlobStore = (storeName: string) => {
    return getStore({
      name: "product-images",
      siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
      token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
      consistency: "strong",
    });
  };

  try {
    const store = getBlobStore("product-images");
    const [imageData, metadataResult] = await Promise.all([
      store.get(key, { type: "arrayBuffer" }),
      store.getWithMetadata(key),
    ]);

    if (!imageData) return { statusCode: 404 };

    // Type-safe metadata access
    const metadata = metadataResult?.metadata as BlobMetadata | undefined;
    const contentType =
      metadata?.contentType || getContentTypeFromKey(key) || "image/jpeg";

    return {
      statusCode: 200,
      body: Buffer.from(imageData).toString("base64"),
      isBase64Encoded: true,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    };
  } catch (error) {
    console.error("Error serving image:", error);
    return { statusCode: 500 };
  }
};

// Helper function with proper typing
function getContentTypeFromKey(key: string): string {
  const extension = key.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}
