import React from 'react'
import { motion, AnimatePresence } from "framer-motion";


function Complain() {
  return (
    
    <motion.div className="p-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <h2 className="text-2xl font-bold mb-4">Complain Items</h2>
  qqqqqqqqqqqqqq
    
    </motion.div>
  )
}

export default Complain
