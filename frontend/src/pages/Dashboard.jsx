import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { motion, AnimatePresence, FlatTree } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const Dashboard = () => {


  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Purchases Data
        const purchaseResponse = await axios.get("http://127.0.0.1:8000/purchase/");
        const purchases = purchaseResponse.data;

        // Fetch Products Data
        const productResponse = await axios.get("http://127.0.0.1:8000/products/");
        const products = productResponse.data;

        // Group total sales by date
        const salesByDate = purchases.reduce((acc, purchase) => {
          const date = new Date(purchase.created_at).toLocaleDateString();
          acc[date] = (acc[date] || 0) + purchase.total_price;
          return acc;
        }, {});

        // Prepare stock level data
        const stockLevels = products.map((product) => ({
          name: product.name,
          stock: product.stock,
        }));

        setChartData1({
          labels: Object.keys(salesByDate), // X-axis (Dates)
          datasets: [
            {
              label: "Total Sales ($)",
              data: Object.values(salesByDate), // Y-axis (Total Sales)
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              pointRadius: 20,
              pointHoverRadius: 7,
              tension: 1, // Smooth curve
            },
            {
              label: "Stock Levels",
              data: stockLevels.map((p) => p.stock), // Y-axis (Stock)
              borderColor: "#FF6384",
              backgroundColor: "rgba(248, 7, 59, 0.2)",
              pointRadius: 20,
              pointHoverRadius: 7,
              tension: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);




  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerId) {
      navigate("/login")
    }
  })
  

  const [purchases, setPurchases] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const loadPurchase = async () => {
      try {

        const response = await axios.get("http://127.0.0.1:8000/purchase/");
        setPurchases(response.data);
        // const purchases = response.data;
        const productSales = purchases.reduce((acc, purchase) => {
          acc[purchase.product_name] = (acc[purchase.product_name] || 0) + purchase.total_price;
          return acc;
        }, {});
        console.log(productSales)
     
        setChartData({
          labels: Object.keys(productSales),
          datasets: [
            {
              label: "Total Sales ($)",
              data: Object.values(productSales),
              backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
              borderWidth: 3,
            },
          ],
        });
      } catch (error) {
        toast.error("Failed. Please try again.");
      }

    };

    loadPurchase();
  }, []);


  const total = purchases.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total_order = purchases.reduce((sum, item) => sum + item.quantity, 0);



  const [customers, setUser] = useState([])
  useEffect(() => {
    (async () => await loadCustomers())();
  }, [])

  async function loadCustomers() {
    const result = await axios.get(
      "http://127.0.0.1:8000/customer");
    setUser(result.data);
    // console.log(result.data);
  }
  const total_customer = customers.length;



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
  const total_product = products.length;

 

  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 border-l-8 border-red-700">
          <h2 className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</h2>
          <p className="text-gray-500">All Sales</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-l-8 border-green-700">
          <h2 className="text-2xl font-bold text-gray-800">{total_order}</h2>
          <p className="text-gray-500">Total Orders</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-l-8 border-purple-700">
          <h2 className="text-2xl font-bold text-gray-800">{total_customer}</h2>
          <p className="text-gray-500">New Customers</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-l-8 border-blue-700">
          <h2 className="text-2xl font-bold text-gray-800">{total_product}</h2>
          <p className="text-gray-500">Total Products</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-bold mb-4">Sales & Stock Trends</h3>
          <Line data={chartData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Total Sales per Product</h3>
          <Bar data={chartData} />
        </div>
      </div>

    </motion.div>
  );
};

export default Dashboard;
