import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaBox, FaShoppingCart, FaCogs, FaSignOutAlt, FaUser, FaTachometerAlt } from "react-icons/fa"; // Import icons
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the localStorage
    // localStorage.removeItem('customerId');

    // Optionally, clear all localStorage
    localStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  const sidebarVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };


  const linkVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.3 },
    },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
  };


  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <motion.div className="bg-gray-900 text-white w-60 h-screen"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <motion.div className="p-4 text-center border-b-gray-500 border-b-2"
        variants={linkVariants}
      >
        <p className="text-3xl font-bold">Vision Computers</p>
      </motion.div>

      <motion.div className=" flex px-4 mx-4 py-2 mb-4 mt-3 border-b-gray-500 border-b-2"
        variants={linkVariants}
      >
        <FaUser className="mr-3 mt-1 size-5" />
        <p className="mt-1 text-sm font-bold">Admin</p>
      </motion.div>

      <nav className="mt-10">

        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/admin"
            className={`flex justify-start px-4 py-2 mx-4 mb-4 rounded-md ${isActive("/admin") ? "bg-gray-500" : "hover:bg-gray-700"
              }`}
          >
            <FaTachometerAlt className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Dashboard</p>
          </Link>
        </motion.div>


        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/admin/manage_customer"
            className={`flex justify-start px-4 mx-4 py-2 mb-4 rounded-md ${isActive("/admin/manage_customer") ? "bg-gray-500" : "hover:bg-gray-700"
              }`}
          >
            <FaUsers className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Manage Customers</p>
          </Link>
        </motion.div>



        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/admin/product_management"
            className={`flex justify-start px-4 py-2 mx-4 mb-4 rounded-md ${isActive("/admin/product_management") ? "bg-gray-500" : "hover:bg-gray-700"
              }`}
          >
            <FaBox className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Product Management</p>
          </Link>
        </motion.div>




        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/admin/purchases"
            className={`flex justify-start px-4 py-2  mx-4 mb-4 rounded-md ${isActive("/admin/purchases") ? "bg-gray-500" : "hover:bg-gray-700"
              }`}
          >
            <FaShoppingCart className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Purchases</p>
          </Link>
        </motion.div>


        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/admin/settings"
            className={`flex justify-start px-4 py-2 mx-4 mb-4 rounded-md ${isActive("/admin/settings") ? "bg-gray-500" : "hover:bg-gray-700"
              }`}
          >
            <FaCogs className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Settings</p>
          </Link>
        </motion.div>



        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap">
          <Link
            onClick={handleLogout}
            className="flex justify-start mx-4 px-4 py-2 hover:bg-gray-700 mt-20"
          >
            <FaSignOutAlt className="mr-3 mt-1 size-7" />
            <p className="mt-1 text-sm">Logout</p>
          </Link>
        </motion.div>


      </nav>
    </motion.div>
  );
}

export default Sidebar;
