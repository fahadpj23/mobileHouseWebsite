import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { parse } from "lambda-multipart-parser";
import admin from "firebase-admin";

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

const imageStore = getStore({
  name: "product-image",
  siteID: "cd343d69-cc85-4f10-8147-8d45480dc62e",
  token: "nfp_LpuPMgwQym2qkcfG3YsbV2i5akyFT1jz37ad",
  consistency: "strong",
});

const db = admin.firestore();
const newArrivalCollection = db.collection("newArrival");

exports.handler = async (event, context) => {
  try {
    // GET - List all newArrival
    if (event.httpMethod === "GET") {
      try {
        // Get products from Firestore
        const snapshot = await newArrivalCollection.get();
        const newArrival: any = [];

        snapshot.forEach((doc) => {
          newArrival.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return {
          statusCode: 200,
          body: JSON.stringify(newArrival),
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
    }

    // POST - Create new newArrival
    if (event.httpMethod === "POST") {
      try {
        const { files, seriesId } = await parse(event);

        // Store images and get keys
        const file: any = files[0];
        const key = `img-${Date.now()}-${file.filename.replace(/\s+/g, "-")}`;

        await imageStore.set(key, file.content, {
          metadata: {
            contentType: file.contentType,
          },
        });

        // Create product data for Firestore
        const productData = {
          seriesId,
          image: `/.netlify/functions/get-image?key=${key}`,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Add product to Firestore
        const docRef = await db.collection("newArrival").add(productData);

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: " added successfully",
            productId: docRef.id,
          }),
        };
      } catch (error) {
        console.error("Error adding :", error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: "Error adding ",
            details: error.message,
          }),
        };
      }
    }

    // DELETE - Remove newArrival
    if (event.httpMethod === "DELETE") {
      let id = event.path.split("/").pop();

      // If no ID in path, try to get from body
      if (!id || id === "newArrival") {
        const body = event.body ? JSON.parse(event.body) : {};
        id = body.id;
      }

      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing ID parameter" }),
        };
      }
      const newArrivalRef = db.collection("newArrival").doc(id);
      const docSnapshot = await newArrivalRef.get();

      if (!docSnapshot.exists) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Document not found" }),
        };
      }

      // Delete the document
      await newArrivalRef.delete();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "newArrival item deleted successfully",
          id: id,
        }),
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
