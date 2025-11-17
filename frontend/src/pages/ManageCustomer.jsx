import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { motion, AnimatePresence, FlatTree } from "framer-motion";
import { variables } from "../Variables";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function ManageCustomers() {

  const [id, setId] = useState('');
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("");
  const [customers, setUser] = useState([])

  // const [data, setData] = useState([])

  useEffect(() => {
    (async () => await loadCustomers())();
  }, [])

  async function loadCustomers() {
    const result = await axios.get(
      "http://127.0.0.1:8000/customer");
    setUser(result.data);
    // console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/customer/", {
        first_name: fname,   // Corrected field name
        last_name: lname,
        email: email,
        password: password,
        phone_number: phone,    // Corrected field name
        address: address
      });
      // alert("Customer added successfully!");
      setShowModal(false);
      toast.success("Customer added successfully!");
      // Clear form fields after saving
      setId("");
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setAddress("");
      // Reload customer list

      loadCustomers();

    } catch (err) {
      console.error(err);
      // alert("Failed to add customer. Please try again.");
      toast.error("Failed to add customer. Please try again.");
    }
  }

  async function DeleteCustomer(id) {

    await axios.delete("http://127.0.0.1:8000/customer/" + id);
    // alert("Student deleted Successfully");
    toast.success("Customer deleted successfully!");
    setId("");
    setFname("");
    setLname("");
    setEmail("");
    setPhone("");
    setAddress("");
    loadCustomers();
  }

  async function editCustomer(customer) {
    setId(customer.CId);
    setFname(customer.first_name);
    setLname(customer.last_name);
    setEmail(customer.email);
    setPhone(customer.phone_number);
    setAddress(customer.address);
  }

  async function update(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Construct the customer data object
      const customerData = {
        CId: id, // Ensure 'CId' matches the backend field for the customer ID
        first_name: fname, // Use the correct field names as expected by your backend
        last_name: lname,
        email: email,
        phone_number: phone, // Ensure the field names match the backend model/serializer
        address: address,
        updated:false
      };

      // Make the PUT request to update the customer
      await axios.put(`http://127.0.0.1:8000/customer/${id}`, customerData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Display success message
      setShowEditModal(false);
      toast.success("Customer added successfully!");

      // Refresh the customer list and reset the form fields
      loadCustomers();
      setId("");
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (err) {
      // Handle errors gracefully
      toast.error("Failed to update customer. Please try again.");
      console.error("Error updating customer:", err);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };


  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModel, setConfirmationModel] = useState(false)

  const confirmDelete = () => {
    DeleteCustomer(id); // Call the delete function
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
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">Manage Customers</h2>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 hover:bg-indigo-900"
        onClick={() => setShowModal(true)}
      >
        Add Customer
      </button>
      <ToastContainer />
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>

          {customers.map(function fn(cus, index) {
            return (
              <tr key={cus.CId}>
                <td className="border px-4 py-2">{++index}</td>
                <td className="border px-4 py-2">{cus.first_name} {cus.last_name}</td>
                <td className="border px-4 py-2">{cus.email}</td>
                <td className="border px-4 py-2">{cus.phone_number}</td>
                <td className="border px-4 py-2">{cus.address}</td>

                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 mx-1 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={() => {
                      setShowEditModal(true);
                      editCustomer(cus);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-4 py-1 mx-1 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={() => {
                      setConfirmationModel(true); // Corrected this line
                      setId(cus.CId);
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
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
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
            <h3 className="text-lg font-bold mb-4">Add Customer</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Fist name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer name"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value)
                  }}

                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Last name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer name"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter contact number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter contact number"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
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
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}




      {/* edit customer details model  */}
      {/* showEditModal, setShowEditModal] */}

      {showEditModal && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}

          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEditModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Update Customer</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Fist name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer name"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value)
                  }}



                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Last name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer name"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter customer email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter contact number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter contact number"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  onClick={update}
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
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}

export default ManageCustomers;

