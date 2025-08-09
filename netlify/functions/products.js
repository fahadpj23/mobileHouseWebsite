const { getStore } = require("@netlify/blobs");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
const { parse } = require("lambda-multipart-parser");
const admin = require("firebase-admin");
// const { v4: uuidv4 } = require("uuid");
// const admin = require("firebase-admin");

// Initialize Firebase if not already initialized
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

const db = admin.firestore(); // Correct Firestore instance
const getBlobStore = (storeName) => {
  return getStore({
    name: "product-images",
    siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
    token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
    consistency: "strong",
  });
};
const store = getBlobStore("product-images");
const productsCollection = db.collection("products");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === "GET") {
      // Handle image requests
      if (event.path.includes("/blobs/")) {
        const blobId = event.path.split("/blobs/")[1];
        const { data, metadata } = await store.getWithMetadata(blobId);

        return {
          statusCode: 200,
          headers: {
            "Content-Type": metadata.contentType || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
          body: data.toString("base64"),
          isBase64Encoded: true,
        };
      }

      // Get single product by ID
      if (event.queryStringParameters?.id) {
        const doc = await productsCollection
          .doc(event.queryStringParameters.id)
          .get();

        if (!doc.exists) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "Product not found" }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ id: doc.id, ...doc.data() }),
        };
      }

      // Get all products
      const snapshot = await productsCollection.get();
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    }
    // Handle image requests
    if (event.path.includes("/blobs/") || event.queryStringParameters.blob) {
      const blobId = event.path.includes("/blobs/")
        ? event.path.split("/blobs/")[1]
        : event.queryStringParameters.blob;

      try {
        const { data, metadata } = await store.getWithMetadata(blobId);

        if (!data) {
          return {
            statusCode: 404,
            body: "Image not found",
          };
        }

        // Determine content type from metadata or file extension
        let contentType = metadata?.contentType;
        if (!contentType) {
          const extension = blobId.split(".").pop().toLowerCase();
          contentType =
            extension === "png"
              ? "image/png"
              : extension === "gif"
              ? "image/gif"
              : "image/jpeg"; // default to jpeg
        }

        return {
          statusCode: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
          body: data.toString("base64"),
          isBase64Encoded: true,
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }
    }
    // POST - Create new product
    if (event.httpMethod === "POST") {
      const result = await parse(event);

      // Extract all fields from the form data
      const { productName, colors, variants, ...otherFields } = result;

      // Get the files from the parsed result
      const files = result.files || [];

      // Create a mapping of field names to their files
      const fileMap = {};
      files.forEach((file) => {
        fileMap[file.fieldname] = file;
      });

      // Process colors - now contains references to file fields
      const colorData = JSON.parse(colors);
      const processedColors = await Promise.all(
        colorData.map(async (color) => {
          const imageUrls = await Promise.all(
            color.images.map(async (imageFieldRef, index) => {
              const file = fileMap[imageFieldRef]; // Get the actual file using the reference
              if (!file) {
                throw new Error(`File not found for field: ${imageFieldRef}`);
              }

              const blobId = `${color.name.toLowerCase()}-${Date.now()}-${index}.jpg`;
              await store.set(blobId, file.content, {
                metadata: { contentType: file.contentType },
              });
              return `/blobs/${blobId}`;
            })
          );
          return { ...color, images: imageUrls };
        })
      );

      // Save product to Firestore
      const productRef = await productsCollection.add({
        productName: productName,
        variants: JSON.parse(variants),
        ...otherFields,
        colors: processedColors,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          id: productRef,
          message: "Product created successfully",
        }),
      };
    }

    // PUT - Update product
    if (event.httpMethod === "PUT") {
      const updatedProduct = JSON.parse(event.body);
      const productRef = productsCollection.doc(updatedProduct.id);

      await productRef.update({
        ...updatedProduct,
        // updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const updatedDoc = await productRef.get();

      return {
        statusCode: 200,
        body: JSON.stringify({
          id: updatedDoc.id,
          ...updatedDoc.data(),
        }),
      };
    }

    // DELETE - Remove product
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);
      await productsCollection.doc(id).delete();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product deleted", id }),
      };
    }

    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
