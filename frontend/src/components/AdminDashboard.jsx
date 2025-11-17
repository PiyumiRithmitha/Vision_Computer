
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ManageCustomers from '../pages/ManageCustomer';
import ProductManagement from '../pages/ProductManagement';
import Purchases from '../pages/Purchases';
import Settings from '../pages/Settings';
import Dashboard from '../pages/Dashboard';

function AdminDashboard() {
 
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Routes>
        <Route path="/" element={<Dashboard/>} />
          <Route path="/manage_customer" element={<ManageCustomers />} />
          <Route path="product_management" element={<ProductManagement />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;

