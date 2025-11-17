// import React from 'react'
// import Help from '../pages/Help'
// import Profile from '../pages/Profile'
// import Complain from '../pages/Complain'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SidebarC from './SidebarC'

// function CustomerDashboard() {
//   return (
//     <Router>
//       <div className="flex h-screen">
//         <SidebarC />
//         <div className="flex-1 bg-gray-100">
//           <Routes>
//           <Route path="/customer" element={<CustomerDashboard/>} />
//             <Route path="/help" element={<Help />} />
//             <Route path="/complain" element={<Complain />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   )
// }

// export default CustomerDashboard



import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarC from './SidebarC';
import Help from '../pages/Help';
import Profile from '../pages/Profile';
import Complain from '../pages/Complain';
import PurchasedItems from '../pages/PurchasedItems';

function CustomerDashboard() {
  return (
    <div className="flex h-screen">
      <SidebarC />
      <div className="flex-1 bg-gray-100">
        <Routes>
          <Route path="/" element={<PurchasedItems/>} />
          <Route path="/help" element={<Help />} />
          <Route path="/complain" element={<Complain />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default CustomerDashboard;

