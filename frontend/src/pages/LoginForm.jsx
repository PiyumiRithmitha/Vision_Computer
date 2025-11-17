// LoginForm.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import landingImage from '../assets/images/landingImage.jpg'
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.state?.regSuccess) {
            toast.success('Registration successful');
        }
    }, [location]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
    };


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/customer/", {
                password: password,
                email: email,
                login: true,
            });
            if (response.status === 200) {
                const customer = response.data.customer; // Adjust to match backend response structure
    
                // Check the value of the roll field
                if (customer.roll === 1) {
                    localStorage.setItem("customer", JSON.stringify(customer));
                    localStorage.setItem("customerId", customer.CId);
                    localStorage.setItem("customeremail", customer.email);
                    console.log(customer);
                    // console.log(customer.id);
                    navigate("/admin");
                } else {
                    localStorage.setItem("customer", JSON.stringify(customer));
                    localStorage.setItem("customerId", customer.CId);
                    localStorage.setItem("customeremail", customer.email);
                    console.log(customer);
                    navigate("/customer");
                    // console.log(customer.id);
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed");
        }
    }
    


    return (
        <motion.div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-200"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${landingImage})`
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            <ToastContainer />

            <motion.div className="bg-white/20 backdrop-blur-md rounded-lg p-8 shadow-lg w-96"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
            >
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <input
                            type="email" required
                            placeholder="Your Email"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password" required
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className=" flex justify-between text-right mb-4">
                        <div>
                            <p>Don't hava an account?     <a href="/register" className="text-blue-700 font-bold hover:underline  text-sm">
                            Register
                        </a></p>
                        </div>

                        


                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-800 transition"
                        onClick={login}
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default LoginForm;
