const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// Path to JSON data file
const dataPath = path.join(process.cwd(), "products.json");

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

// Helper functions for data operations
const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

exports.handler = async (event, context) => {
  try {
    // GET - List all products
    if (event.httpMethod === "GET") {
      const products = readData();
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    }

    // POST - Create new product
    if (event.httpMethod === "POST") {
      console.log(event.body);
      const newProduct = JSON.parse(event.body);
      newProduct.id = uuidv4();
      newProduct.createdAt = new Date().toISOString();
      newProduct.updatedAt = newProduct.createdAt;

      const products = readData();
      products.push(newProduct);
      writeData(products);

      return {
        statusCode: 201,
        body: JSON.stringify(newProduct),
      };
    }

    // PUT - Update product
    if (event.httpMethod === "PUT") {
      const updatedProduct = JSON.parse(event.body);
      updatedProduct.updatedAt = new Date().toISOString();

      let products = readData();
      products = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      writeData(products);

      return {
        statusCode: 200,
        body: JSON.stringify(updatedProduct),
      };
    }

    // DELETE - Remove product
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);

      let products = readData();
      products = products.filter((p) => p.id !== id);
      writeData(products);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product deleted" }),
      };
    }

    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
