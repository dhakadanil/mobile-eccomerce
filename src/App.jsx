import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Navbar from './components/Navbar';

// Context Import (Path check kar lein agar alag ho toh)
import { AuthContext } from './context/AuthContext';

// Pages Imports
import Dashboard from './pages/Admin/Dashboard';
import AddMobile from './pages/Admin/AddMobile';
import WelCome from './components/WelCome';
import ProductDetails from './pages/Users/ProductDetails';
import Cart from './pages/Users/Cart';
import Checkout from './pages/Users/CheckOut';
import OrderSuccess from './pages/Users/OrderSuccess';
import Login from './pages/Users/Login';
import Register from './pages/Users/Register';

// 🔐 1. USER SECURITY WRAPPER (Taala)
// Jo bhi page iske andar wrap hoga, wo bina login ke nahi khulega
const PrivateWrapper = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// 👑 2. ADMIN SECURITY WRAPPER (Extra Taala)
// Isse normal customer kabhi bhi admin dashboard nahi khol payega
const AdminWrapper = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          {/* 🔓 PUBLIC ROUTES (Bina login ke khul sakte hain) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 PROTECTED USER ROUTES (Bina login ke automatic redirect ho jayenge) */}
          <Route path="/" element={<PrivateWrapper><WelCome /></PrivateWrapper>} />
          <Route path="/product/:id" element={<PrivateWrapper><ProductDetails /></PrivateWrapper>} />
          <Route path="/cart" element={<PrivateWrapper><Cart /></PrivateWrapper>} />
          <Route path="/checkout" element={<PrivateWrapper><Checkout /></PrivateWrapper>} />
          <Route path="/order-success" element={<PrivateWrapper><OrderSuccess /></PrivateWrapper>} />

          {/* 🔒 PROTECTED ADMIN ROUTES (Login + Admin Role dono zaroori hain) */}
          <Route path="/admin" element={<PrivateWrapper><AdminWrapper><Dashboard /></AdminWrapper></PrivateWrapper>} />
          <Route path="/admin/add" element={<PrivateWrapper><AdminWrapper><AddMobile /></AdminWrapper></PrivateWrapper>} />
          <Route path="/admin/edit/:id" element={<PrivateWrapper><AdminWrapper><AddMobile /></AdminWrapper></PrivateWrapper>} />

          {/* 🔀 FALLBACK CONTROL: Agar koi ulta-pulta URL daale toh automatic secure page par bhej do */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
