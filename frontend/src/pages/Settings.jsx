import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Settings() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  const id = localStorage.getItem("customerId");

  // Load data from local storage on mount
  useEffect(() => {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      const customer = JSON.parse(customerData); // Parse the stored JSON string
      setFormData({
        fname: customer.first_name || "",
        lname: customer.last_name || "",
        email: customer.email || "",
        phone: customer.phone_number || "",
      });
    }
  }, []);

  // Handle input changes & update local storage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Update the customer object in localStorage
      const customerData = JSON.parse(localStorage.getItem("customer")) || {};
      localStorage.setItem("customer", JSON.stringify({
        ...customerData,
        [name === "fname" ? "first_name" : name === "lname" ? "last_name" : name]: value
      }));

      return updatedFormData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on submit

    const customerData = {
      first_name: formData.fname,
      last_name: formData.lname,
      email: formData.email,
      phone_number: formData.phone,
      updated: true  
    };

    try {
      // Axios PUT request to update the customer data
      const response = await axios.put('http://127.0.0.1:8000/customer/' + id, customerData);

      // Handle successful response
      if (response.status === 200) {
        toast.success('Details updated successfully!');
      }

      // Optionally, update the localStorage after successful update
      localStorage.setItem('customer', JSON.stringify({
        ...JSON.parse(localStorage.getItem('customer')),
        ...customerData
      }));

    }
    catch (error) {
      // Handle error response
      toast.error('Failed to update details, please try again.');
    }
};


  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer/>
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">
        Settings
      </h2>

      {/* User Details Form */}
      <form className="space-y-6 bg-white rounded-xl px-6 py-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-900">First Name</label>
            <input
              id="fname"
              name="fname"
              type="text"
              value={formData.fname}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-900">Last Name</label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={formData.lname}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex">
          <Button label='Cancel' type='reset' className='bg-gray-400 p-2 text-gray-900 hover:bg-gray-500 hover:text-white' />
          <Button label='Update' type='submit' className='bg-blue-900 p-2 text-white hover:bg-blue-950 ms-2' />
        </div>
      </form>

      {/* Update Password Form */}
      <form className="space-y-6 mt-9 bg-white rounded-xl px-6 py-5">
        <h2 className="text-xl font-bold mb-4">Update Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          {/* Current Password */}
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-900">Current Password</label>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="Cpassword" className="block text-sm font-medium text-gray-900">Confirm New Password</label>
            <input
              id="Cpassword"
              name="Cpassword"
              type="password"
              required
              className="block w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex">
          <Button label='Cancel' type='reset' className='bg-gray-400 p-2 text-gray-900 hover:bg-gray-500 hover:text-white' />
          <Button label='Update' type='submit' className='bg-blue-900 p-2 text-white hover:bg-blue-950 ms-2' />
        </div>
      </form>
    </motion.div>
  );
}

export default Settings;
