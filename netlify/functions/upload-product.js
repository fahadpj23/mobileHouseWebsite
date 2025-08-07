const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");

const { execSync } = require("child_process");

// Configure paths
const UPLOAD_DIR = path.join(process.cwd(), "public", "products");
const LARGE_MEDIA_DIR = path.join(process.cwd(), "media", "products");

// Ensure directories exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(LARGE_MEDIA_DIR))
  fs.mkdirSync(LARGE_MEDIA_DIR, { recursive: true });

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  return new Promise((resolve, reject) => {
    const busboy = new Busboy({
      headers: event.headers,
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB total limit
      },
    });

    let productData = null;
    const colorsData = {};
    const uploadedFiles = [];

    busboy.on("field", (fieldname, value) => {
      if (fieldname === "productData") {
        productData = JSON.parse(value);
      } else if (
        fieldname.startsWith("color_") &&
        fieldname.endsWith("_data")
      ) {
        const colorIndex = fieldname.split("_")[1];
        colorsData[colorIndex] = JSON.parse(value);
      }
    });

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (!filename) return;

      const [_, colorIndex, __, imageIndex] = fieldname.split("_");
      const fileId = uuidv4();
      const extension = filename.split(".").pop();
      const fileName = `product-${fileId}.${extension}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      const writeStream = fs.createWriteStream(filePath);
      file.pipe(writeStream);

      uploadedFiles.push({
        colorIndex,
        imageIndex,
        fileName,
        filePath,
      });
    });

    busboy.on("error", (error) => {
      reject(error);
    });

    busboy.on("finish", async () => {
      try {
        if (!productData) {
          return resolve({
            statusCode: 400,
            body: JSON.stringify({ error: "Missing product data" }),
          });
        }

        // Process uploaded files
        const productId = uuidv4();
        const colorResults = {};
        const errors = [];

        for (const file of uploadedFiles) {
          try {
            const finalFileName = `product-${productId}-color-${
              file.colorIndex
            }-img-${file.imageIndex}.${path
              .extname(file.fileName)
              .substring(1)}`;
            const finalPath = path.join(LARGE_MEDIA_DIR, finalFileName);

            // Move to Large Media directory
            fs.renameSync(file.filePath, finalPath);

            // Track with Git LFS
            execSync(`git lfs track "${finalPath}"`, { cwd: process.cwd() });
            execSync(`git add "${finalPath}"`, { cwd: process.cwd() });

            if (!colorResults[file.colorIndex]) {
              colorResults[file.colorIndex] = {
                ...colorsData[file.colorIndex],
                images: [],
              };
            }

            colorResults[file.colorIndex].images.push(
              `/media/products/${finalFileName}`
            );
          } catch (error) {
            errors.push(
              `Failed to process image ${file.fileName}: ${error.message}`
            );
          }
        }

        if (errors.length > 0) {
          return resolve({
            statusCode: 500,
            body: JSON.stringify({
              error: "Some images failed to upload",
              details: errors,
            }),
          });
        }

        // Prepare final product data
        const finalProduct = {
          ...productData,
          id: productId,
          colors: Object.values(colorResults),
        };

        // In a real app, you would save this to a database
        const productDataPath = path.join(
          LARGE_MEDIA_DIR,
          `product-${productId}.json`
        );
        fs.writeFileSync(
          productDataPath,
          JSON.stringify(finalProduct, null, 2)
        );

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            product: finalProduct,
          }),
        });
      } catch (error) {
        resolve({
          statusCode: 500,
          body: JSON.stringify({
            error: "Failed to process product",
            details: error.message,
          }),
        });
      }
    });

    busboy.write(event.body, event.isBase64Encoded ? "base64" : "binary");
    busboy.end();
  });
};
