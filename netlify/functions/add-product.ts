// netlify/functions/add-product.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { parse } from "lambda-multipart-parser";
import admin from "firebase-admin";

export const handler: Handler = async (event: any) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "mobilehousewebsite",
        clientEmail:
          "firebase-adminsdk-fbsvc@mobilehousewebsite.iam.gserviceaccount.com",
        privateKey:
          "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvJhs+a22F/pOF\nTpMav2fq8SkRK5weo4s54Op8aCtyyq6VeaPez88dPPNZZ1TEKaNKNJ/tvc5wH/f7\ntdn7Y9kQUS/D0BGCkvyYQTFKheBA0N729Qu82zRigS3o0jG/biycANTBavKl84Lg\nN2cnLgB0rmEyALwkyaDgye556XjWkaff8mTtbONcVySysLCpix204HDg5pyC+wkH\n8acRadg8meerP6yv9oXX94Q05snjeS8LnWkWjQs8SQ5asKktv+Goy1L21jiyVMg0\ngoB5lm2qp4FDJamFRrEK8dwhERxryGJ/GQSl8H6XodYSIImSnNQjxzvLvairmd5c\n8CWRxaJbAgMBAAECggEARl5mgrkRm0yxQ1VS1+O/4g47JCljw5GMfdgGDa6iii+x\nXd+tvXa7bTFQSgKwdVGPR+CFwrRIDRdjAA/LgOtYSex8Zs0hQ9c/QgKrRZgtBY2F\njy3bpehiDxN8ePZ+Qz2GEbVpxT3tOExyMBhCSuT6DOcEqNzPum4Bw16OABAT2wyl\n7C25Y74dJk/Gd1N0yHvP3Cz3nqr+eVp/FpHKa6Z9jRWJkcZ3kW7JL3CyPIrPUq7Z\n7+pyd6+LoZRCOSJsixQsMXgsbK/daikcFDixFBIpc6vB8byvLSxwZ+0xzD898Xqb\nchUF9/hF/JEo5dzHfQJ7IxdxGwIpVMGTFvepZvQ1bQKBgQDtDHyRgVaJv2XubnF5\nzMsXLASU5Msu3+norSqbPMTBuyC0vKSxi6VO4C9etb3lymbhTFjDUjZPcr8MijsD\nnCYRUe3LttJE1ZPmI11PJVUsWNLgiJE5e4TqPwaVORZGeJxZu65cztckPJlkUbz9\nI4XbXnAtbEo8si2YGZT/c4tSXwKBgQC9JsHEpit86poZlsIbrvcynyeDOKh92JIJ\n12NRLWrpNmPbPv2/zRj38awelOdfOD7GBvpiAlRqn0B6LQMYANlkUzm89/VtFAGt\nQXHBRiUm4DrnO2hNizizwtZSml08aLPnJ8wsJlrjaUoqE5kDsCiGQL9wx8B/vHkd\nVyYUXRGJhQKBgCenRhNFEofaZ5+6A+t/EZ4fs+iAWWjO9h8BELaFNNi/h9oUEGzO\n0mleYS4zsr+E2y7nCZYq44DozgK4AOU6sreFAAVq4MO5ApOl6M77jMLtXOFIlxqJ\nihNxVZWSxiIlvOnZ1nIZ+61JIdPBRJ8H2TV4F8XRbp22pJ/j76PH3U97AoGAXEqR\n1wqhQ3UQtZWapnlLgjanx94YUDcgoo6mlhBMDviL5okotLI1EZ2ots8+yXYfIu56\nsuGiINgNVM+rp8WaTNpS3MI7zPorC0dYYs6ACCT2eKbC8LsScpuJiYpqHbSUux/u\n/kfEpxtTpY4kZelJDKCBCF1errTef5NrMBptGSUCgYBbLSbFIVAORP1i3J5UXKyi\nxhuKB3mc1qghVia8yrQBYCtLDqrpHo3DNRbSOkA979X0HjCCEvEIWHgCxYNl43rK\ntzUEyoy7P/7i0zKHdZgbjiUnx/dy/Ju2XbBU6X4APxzEVoauwNmVGEpQ+G+EwHRe\ndmijsMwCG1H8z42o5yXScw==\n-----END PRIVATE KEY-----\n".replace(
            /\\n/g,
            "\n"
          ),
      }),
    });
  }

  const db = admin.firestore();
  const productsCollection = db.collection("products");

  // Initialize Netlify Blob store just for images
  const imageStore = getStore({
    name: "product-image",
    siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
    token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
    consistency: "strong",
  });

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { files, ...fields } = await parse(event);
    const colors = JSON.parse(fields.colors);

    // Track which files we've processed
    let fileIndex = 0;

    // Process each color variant and assign images
    for (const color of colors) {
      if (!color.id) {
        color.id = `${fields.productName
          .toLowerCase()
          .replace(/\s+/g, "-")}-${color.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;
      }
      if (!color.images) color.images = [];

      // Assign the ne  xt set of files to this color
      const imagesForColor = color.images || [];
      for (
        let i = 0;
        i < imagesForColor.length && fileIndex < files.length;
        i++
      ) {
        const file: any = files[fileIndex];
        const key = `img-${Date.now()}-${color.name}-${file.filename.replace(
          /\s+/g,
          "-"
        )}`;

        await imageStore.set(key, file.content, {
          metadata: {
            contentType: file.contentType,
            color: color.name,
            productName: fields.productName,
          },
        });

        imagesForColor[i] = {
          url: `/.netlify/functions/get-image?key=${key}`,
          key: key,
          altText: `${fields.productName} - ${color.name}`,
        };

        fileIndex++;
      }
      color.images = imagesForColor;
    }

    // Create product data for Firestore
    const productData = {
      productName: fields.productName,
      brand: fields.brand,
      variants: JSON.parse(fields.variants),
      seriesId: fields.seriesId,
      rating: parseFloat(fields.rating),
      display: fields.display,
      frontCamera: fields.frontCamera,
      rearCamera: fields.rearCamera,
      launchDate: fields.launchDate,
      battery: fields.battery,
      os: fields.os,
      processor: fields.processor,
      colors: colors, // Updated colors with image keys
      category: fields.category,
      networkType: fields.networkType,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Add product to Firestore
    const docRef = await db.collection("products").add(productData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product added successfully",
        productId: docRef.id,
        product: productData,
      }),
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error adding product",
        details: error.message,
      }),
    };
  }
};
