const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { parse } = require("querystring");

// Directory to store uploaded images (for demo purposes)
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const parsed = parse(event.body);
    const base64Data = parsed.image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const imageName = `img-${uuidv4()}.jpg`;
    const imagePath = path.join(uploadDir, imageName);

    fs.writeFileSync(imagePath, buffer);

    const imageUrl = `/uploads/${imageName}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to upload image" }),
    };
  }
};
