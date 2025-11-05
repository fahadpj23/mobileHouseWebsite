import { fetchProducts } from "store/slice/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useEffect, useState } from "react";
import { addStock } from "store/slice/stockSlice";

const Stock = () => {
  const dispatch = useAppDispatch();
  const { entities: products } = useAppSelector(
    (state) => state?.user?.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [stockToAdd, setStockToAdd] = useState<any>("");

  const handleAddStock = () => {
    if (!selectedProduct || !selectedVariant || !selectedColor || !stockToAdd) {
      alert("Please select product, variant, color and enter stock");
      return;
    }

    dispatch(
      addStock({
        productId: selectedProduct.id,
        variantId: selectedVariant.id,
        colorId: selectedColor.id,
        addedStock: parseInt(stockToAdd),
      })
    );

    // 🔹 Here you can call your API:
    // await axios.put(`/api/products/${selectedProduct.id}/variant/${selectedVariant.id}/color/${selectedColor.id}/stock/add`, { quantity: parseInt(stockToAdd) })

    alert(
      `✅ Added ${stockToAdd} to ${selectedProduct.name} → ${selectedVariant.name} → ${selectedColor.name}`
    );

    setStockToAdd("");
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Product Stock</h2>

      {/* Product Select */}
      <select
        className="w-full border p-2 rounded mb-3"
        onChange={(e) => {
          const prod = products?.find((p: any) => p.id === e.target.value);
          setSelectedProduct(prod);
          setSelectedVariant(null);
          setSelectedColor(null);
        }}
      >
        <option value="">Select Product</option>
        {products?.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.productName}
          </option>
        ))}
      </select>

      {/* Variant Select */}
      {selectedProduct && (
        <select
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => {
            const variant = selectedProduct.variants.find(
              (v: any) => v.id === e.target.value
            );
            setSelectedVariant(variant);
            setSelectedColor(null);
          }}
        >
          <option value="">Select Variant</option>
          {selectedProduct.variants.map((v: any) => (
            <option key={v.id} value={v.id}>
              {`${v.ram} / ${v.storage}`}
            </option>
          ))}
        </select>
      )}

      {/* Color Select */}
      {selectedProduct && (
        <select
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => {
            const color = selectedProduct?.colors.find(
              (c: any) => c.id === e.target.value
            );
            setSelectedColor(color);
          }}
        >
          <option value="">Select Color</option>
          {selectedProduct?.colors.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      {/* Add Stock */}
      {selectedColor && (
        <div className="mt-2">
          <input
            type="number"
            placeholder="Enter stock to add"
            value={stockToAdd}
            onChange={(e) => setStockToAdd(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />
          <button
            onClick={handleAddStock}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Add Stock
          </button>
        </div>
      )}
    </div>
  );
};
export default Stock;
