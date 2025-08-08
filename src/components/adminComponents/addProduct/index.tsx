// src/components/AddProrduct.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// src/types/product.ts
export interface ProductImage {
  url: string;
  fileName: string;
  altText?: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: File[];
}

const AddProrduct = () => {
  const [product, setProduct] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    images: [],
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProduct((prev: any) => ({ ...prev, images: files }));

      // Create preview URLs
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("category", product.category);
      formData.append("stock", product.stock.toString());

      // Append each image file
      product.images.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await fetch("/.netlify/functions/add-product", {
        method: "POST",
        body: formData, // Send as FormData, not JSON
      });

      console.log("Product added:", response);
      // Reset form after successful submission
      setProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        images: [],
      });
      setPreviewImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setUploading(false);
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/.netlify/functions/get-products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].altText || product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProrduct;
