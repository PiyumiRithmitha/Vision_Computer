import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Purchases() {
  const [products, setProducts] = useState([]);
  // List of products from the backend
  const [selectedProduct, setSelectedProduct] = useState(""); // Selected product ID
  const [quantity, setQuantity] = useState(1); // Quantity input
  const [email, setEmail] = useState(""); // Email input


  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const loadPurchase = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/purchase/");
        setPurchases(response.data);
        // toast.success("Successfully!");
      } catch (error) {
        toast.error("Failed. Please try again.");
      }
    };

    loadPurchase();
  }, []);









  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/product/", {
          PurchaseItem: true,

        }
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find the selected product details
    const product = products.find((p) => p.id === parseInt(selectedProduct));

    // Calculate the total price
    const totalPrice = product ? product.price * quantity : 0;

    // Send data to the backend
    try {
      const response = await axios.post("http://127.0.0.1:8000/purchase/", {
        email,
        product_id: selectedProduct,
        quantity,
        total_price: totalPrice,
        savePurchas: true,
      });

      if (response.status === 201) {
        console.log("Purchase saved successfully:", response.data);
        toast.success("Purchase saved successfully!");
      }
    } catch (error) {
      console.error("Error saving purchase:", error);
      alert("Failed to save purchase.");
    }
  };




  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">Purchases</h2>
      <ToastContainer />

      <form
        className="flex flex-wrap justify-between items-center bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        {/* Product Selection */}
        <div className="flex flex-col">
          
          <label className="font-semibold text-gray-700">Product</label>
          <select
            name="example"
            id="example"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="p-3 border rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity Input */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-3 border rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-600 text-white p-3 px-6 font-semibold rounded-lg hover:bg-blue-700 transition duration-300 mt-6"
          type="submit"
        >
          Submit
        </button>
      </form>


      {/* Styled Table */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
              <th className="px-6 py-3 text-sm font-semibold">No</th>
              <th className="px-6 py-3 text-sm font-semibold">Product Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Quantity</th>
              <th className="px-6 py-3 text-sm font-semibold">Unit Price</th>
              <th className="px-6 py-3 text-sm font-semibold">Customer Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No purchases found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase, index) => (
                <tr
                  key={purchase.id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {purchase.product_name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{purchase.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">${purchase.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">{purchase.email}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">
                    ${(purchase.price * purchase.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </motion.div>
  )
}

export default Purchases;