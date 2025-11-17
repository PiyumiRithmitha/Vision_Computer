import React, { useEffect, useState } from 'react'
import { FlatTree, motion } from "framer-motion";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ProductManagement() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [isActive, setIsActive] = useState(true); // Default value is true
  const [createdAt, setCreatedAt] = useState('');

  const [products, setAllProduct] = useState([]);

  useEffect(() => {
    (async () => await loadProducts())();
  }, [])

  async function loadProducts() {
    const result = await axios.get(
      "http://127.0.0.1:8000/product");
    setAllProduct(result.data);
    console.log(result.data);
  }

  async function saveProduct(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/product/", {
        name: name,               // Product name
        brand: brand,             // Product brand
        description: description, // Product description
        price: price,             // Product price
        stock: stock,             // Product stock
        is_active: isActive,
        created_at: createdAt
        // Product active status
      });

      // Display success message
      toast.success("Product added successfully!");

      // Clear form fields after saving
      setName("");
      setBrand("");
      setDescription("");
      setPrice("");
      setStock("");
      setCreatedAt("");
      setIsActive(true);

      // Hide modal
      setShowModal(false);

      // Reload product list
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product. Please try again.");
    }
  }

  async function Deleteproduct(id) {

    await axios.delete("http://127.0.0.1:8000/product/" + id);
    // alert("Student deleted Successfully");
    toast.success("Product deleted successfully!");
    setId("");
    setName("");
    setBrand("");
    setDescription("");
    setPrice("");
    setStock("");
    setCreatedAt("");
    setIsActive(true);
    setShowModal(false);
    loadProducts();
  }


  async function editProduct(product) {
    setId(product.id);
    setName(product.name);
    setBrand(product.brand);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setCreatedAt(product.createdAt);
    setIsActive(product.isActive);
    
  }

  async function updateProduct(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Construct the customer data object
      const productData = {
        id: id, // Ensure 'CId' matches the backend field for the customer ID
        name: name,               // Product name
        brand: brand,             // Product brand
        description: description, // Product description
        price: price,             // Product price
        stock: stock,             // Product stock
        is_active: isActive,
        created_at: createdAt,
      };
      console.log(name);
      // Make the PUT request to update the product
      await axios.put(`http://127.0.0.1:8000/product/${id}`, productData);

      // Display success message
      setEditProductModal(false);
      toast.success("Product Update successfully!");

      // Refresh the product list and reset the form fields
      setId("");
      setName("");
      setBrand("");
      setDescription("");
      setPrice("");
      setStock("");
      setCreatedAt("");
      setIsActive(true);
      setShowModal(false);
      loadProducts();
    } catch (err) {
      // Handle errors gracefully
      toast.error("Failed to update product. Please try again.");
      console.error("Error updating product:", err);
    }
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };
  const [showModal, setShowModal] = useState(false);
  const [showEditProductModal, setEditProductModal] = useState(false);
  const [showConfirmationModel, setConfirmationModel] = useState(false)

  const confirmDelete = () => {
    Deleteproduct(id); // Call the delete function
    setConfirmationModel(false); // Close the modal
    setId(""); // Clear the selected product ID
  };

  const cancelDelete = () => {
    setConfirmationModel(false); // Close the modal
    setId(""); // Clear the selected product ID
  };

  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">Product Management</h2>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 hover:bg-indigo-900"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>
      <ToastContainer />
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(function fn(product, index) {
            return (
              <tr key={product.id}>
                <td className="border px-4 py-2">{++index}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.brand}</td>
                <td className="border px-4 py-2">{product.description || "N/A"}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  {product.is_active ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(product.created_at).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-6 py-1 mx-1 mb-2 rounded-md shadow-lg hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={() => {
                      setEditProductModal(true);
                      editProduct(product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 mx-1 rounded-md shadow- hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={() => {
                      setConfirmationModel(true); // Show confirmation modal
                      setId(product.id); // Save the product ID
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Add Product</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter stock quantity"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Active</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={saveProduct}
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}


      {/* Edit model */}
      {showEditProductModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditProductModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Add Product</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter description"
                  value={description}

                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter stock quantity"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Active</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setEditProductModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={updateProduct}
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}


      {/* Confirmation Modal */}
      {showConfirmationModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  )
}

export default ProductManagement
