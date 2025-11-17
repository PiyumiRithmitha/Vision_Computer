import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import Purchases from './Purchases';
import { toast } from 'react-toastify';
import { tr } from 'motion/react-client';
import { useNavigate } from 'react-router-dom';

function PurchasedItems() {





  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();



  useEffect(() => {
    if (!customerId) {
      navigate("/login")
    }
  })

  const email = localStorage.getItem("customeremail");

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/purchase`, {
          params: { email: email }, // Pass email as a query parameter
        });

        setPurchases(response.data); // Ensure the backend returns an array
        toast.success("Purchases loaded successfully!");
      } catch (error) {
        toast.error("Failed to load purchases. Please try again.");
        setPurchases([]); // Prevent errors if API fails
      }
    };

    if (email) {
      loadPurchases(); // Fetch only if email exists
    } else {
      toast.error("No email found in localStorage.");
    }
  }, [email]);

  console.log(purchases);
  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">Purchases Items</h2>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-left">
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
            purchases.map((p, i) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-4 text-gray-700">{i + 1}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{p.product_name}</td>
                <td className="px-6 py-4 text-gray-700">{p.quantity}</td>
                <td className="px-6 py-4 text-gray-700">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700">{p.email}</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">
                  ${(p.price * p.quantity).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>







    </motion.div>
  )
}

export default PurchasedItems
