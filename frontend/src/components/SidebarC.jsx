import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaLifeRing, FaCommentDots, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from "framer-motion";

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

  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div className="bg-gray-900 text-white w-60 h-full"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 text-center border-b-gray-500 border-b-2">
        <p className="text-3xl font-bold">Vision Computers</p>
      </div>

      <div className=" flex px-4 mx-4 py-2 mb-4 mt-3 border-b-gray-500 border-b-2">
        <FaUser className="mr-3 mt-1 size-5" />
        <p className="mt-1 text-sm font-bold">Customer</p>
      </div>

      <nav className="mt-10">
        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/customer"
            className={`flex justify-start px-4 mx-4 py-2 mb-4 rounded-md ${isActive("/customer") ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`}
          >
            <FaShoppingCart className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Purchased Items</p>
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
            to="/customer/help"
            className={`flex justify-start px-4 mx-4 py-2 mb-4 rounded-md ${isActive("/customer/help") ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`}
          >
            <FaLifeRing className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Help</p>
          </Link>
        </motion.div>


        {/* <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/customer/complain"
            className={`flex justify-start px-4 mx-4 py-2 mb-4 rounded-md ${
              isActive("/customer/complain")
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            <FaCommentDots className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Complain</p>
          </Link>
        </motion.div>

 */}

        <motion.div
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to="/customer/profile"
            className={`flex justify-start px-4 mx-4 py-2 mb-4 rounded-md ${isActive("/customer/profile")
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700"
              }`}
          >
            <FaUser className="mr-3 mt-1 size-5" />
            <p className="mt-1 text-sm">Profile</p>
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
