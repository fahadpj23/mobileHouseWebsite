import { useState, ChangeEvent, FormEvent } from "react";

interface ProductColor {
  name: string;
  hex: string;
  images: (File | null)[];
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  colors: ProductColor[];
}

const AddProduct = () => {
  const [product, setProduct] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    colors: [
      {
        name: "",
        hex: "#000000",
        images: Array(5).fill(null),
      },
    ],
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (
    colorIndex: number,
    field: keyof ProductColor,
    value: string
  ) => {
    setProduct((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[colorIndex] = {
        ...updatedColors[colorIndex],
        [field]: value,
      };
      return { ...prev, colors: updatedColors };
    });
  };

  const handleImageChange = (
    colorIndex: number,
    imageIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setProduct((prev) => {
      const updatedColors = [...prev.colors];
      const updatedImages = [...updatedColors[colorIndex].images];
      updatedImages[imageIndex] = file;
      updatedColors[colorIndex] = {
        ...updatedColors[colorIndex],
        images: updatedImages,
      };
      return { ...prev, colors: updatedColors };
    });
  };

  const addColor = () => {
    setProduct((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          name: "",
          hex: "#000000",
          images: Array(5).fill(null),
        },
      ],
    }));
  };

  const removeColor = (index: number) => {
    setProduct((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors.splice(index, 1);
      return { ...prev, colors: updatedColors };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append(
        "productData",
        JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
        })
      );

      product.colors.forEach((color, colorIndex) => {
        color.images.forEach((image, imageIndex) => {
          if (image) {
            formData.append(`color_${colorIndex}_image_${imageIndex}`, image);
          }
        });
        formData.append(
          `color_${colorIndex}_data`,
          JSON.stringify({
            name: color.name,
            hex: color.hex,
          })
        );
      });

      const response = await fetch("/.netlify/functions/upload-product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("Upload success:", result);
      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="product-upload-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <h3>Color Variants</h3>
        {product.colors.map((color, colorIndex) => (
          <div key={colorIndex} className="color-variant">
            <div className="form-group">
              <label>Color Name</label>
              <input
                type="text"
                value={color.name}
                onChange={(e) =>
                  handleColorChange(colorIndex, "name", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Color Hex</label>
              <input
                type="color"
                value={color.hex}
                onChange={(e) =>
                  handleColorChange(colorIndex, "hex", e.target.value)
                }
              />
            </div>

            <div className="image-uploads">
              <label>Images (4-5 per color)</label>
              {color.images.map((image, imageIndex) => (
                <div key={imageIndex} className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleImageChange(colorIndex, imageIndex, e);
                      }
                    }}
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${imageIndex}`}
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => removeColor(colorIndex)}
              className="remove-btn"
            >
              Remove Color
            </button>
          </div>
        ))}

        <button type="button" onClick={addColor} className="add-color-btn">
          Add Another Color
        </button>

        <button type="submit" disabled={uploading} className="submit-btn">
          {uploading ? "Uploading..." : "Save Product"}
        </button>

        {success && (
          <div className="success-message">Product uploaded successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
