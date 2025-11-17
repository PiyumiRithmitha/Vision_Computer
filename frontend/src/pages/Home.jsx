
import React from 'react';
import { Link } from 'react-router-dom'; // Assumes React Router is used for navigation
import landingImage from '../assets/images/landingImage.jpg'
import { motion } from "framer-motion";

const Home = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { duration: 0.8, ease: "easeInOut" } 
        },
        exit: { 
          opacity: 0, 
          
          transition: { duration: 0.5 } 
        },
      };



    return (
        <motion.div className="h-screen flex flex-col items-center justify-center bg-cover bg-center " style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${landingImage})`
        }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="text-center">
                <motion.h1 className="text-6xl font-bold text-white mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                >
                    Vision Computers
                </motion.h1>
                <div className="flex gap-4 justify-center mb-6">
                    
                    <Link
                        to="/login"
                        className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
                    >
                        Administrator
                    </Link>
                    <Link
                        to="/login"
                        className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
                    >
                        Customer
                    </Link>
                </div>
                <Link
                    to="/register"
                    className="absolute top-6 right-6 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                >
                    Register
                </Link>
            </div>
            <motion.p className="text-white text-center mt-12 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
            >
                At Tech Haven, we specialize in providing high-quality computers, accessories, and cutting-edge technology solutions for professionals, gamers, and everyday users. Whether you're looking for a powerful gaming PC, a sleek business laptop, or essential accessories, we’ve got you covered..
            </motion.p>
        </motion.div>
    );
};

export default Home;
