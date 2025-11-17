import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


function Help() {
  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-white p-2 flex justify-center rounded-lg">Help</h2>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="max-w-8xl w-full bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-3 flex items-center"><FaMapMarkerAlt className="text-blue-600 mr-2" /> 145/11 Main Street, Matara, Sri Lanka</p>
              <p className="text-gray-600 mb-3 flex items-center"><FaPhone className="text-blue-600 mr-2" /> +1 234 567 890</p>
              <p className="text-gray-600 mb-3 flex items-center"><FaEnvelope className="text-blue-600 mr-2" /> visioncomputers@yahoo.com</p>

              {/* Social Media Links */}
              <div className="flex mt-4 space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook size={30} /></a>
                <a href="#" className="text-blue-600 hover:text-blue-800"><FaTwitter size={30} /></a>
                <a href="#" className="text-blue-600 hover:text-blue-800"><FaInstagram size={30} /></a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Find Us on the Map</h3>
              <iframe
                className="w-full h-60 rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.138803716684!2d81.05907457784876!3d6.112007878080479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6bb9ad0379bdf%3A0x7f47499b9056045c!2sShangri-La%20Hambantota!5e0!3m2!1sen!2slk!4v1738228666570!5m2!1sen!2slk"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          {/* Embedded Map */}
          

        </div>
      </div>
    </motion.div>
  )
}

export default Help
