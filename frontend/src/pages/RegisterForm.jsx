// RegisterForm.jsx
import React, { useState } from "react";
import landingImage from '../assets/images/landingImage.jpg'
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const containerVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };


  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")

  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/customer/", {
        password: password,
        first_name: fname,   // Corrected field name
        last_name: lname,
        email: email,
        phone_number: phone,    // Corrected field name
      });
      if (response.status === 201) {

        setFname("");
        setLname("");
        setEmail("");
        setPhone("");
        setPassword("");
        navigate('/login', { state: { regSuccess: true } });

      }

      // Clear form fields after saving

      // Reload customer list
    } catch (err) {
      console.error(err);
      // alert("Failed to add customer. Please try again.");
      toast.error("Failed");
    }
  }


  return (

    <motion.div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-200"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${landingImage})`
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <ToastContainer />
      <motion.div className="bg-white/60 backdrop-blur-md  rounded-lg p-8 shadow-lg w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First name" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last name" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Contact number" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm password" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mb-2">
            <p>Have already an account?  <a href="/login" className="text-gray-700 font-bold  hover:underline text-sm">
              Login
            </a></p>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-800 transition"
            onClick={save}
          >
            Register
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
