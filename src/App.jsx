import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';

import Dashboard from './pages/Admin/Dashboard';
import AddMobile from './pages/Admin/AddMobile';
import WelCome from './components/WelCome';
import ProductDetails from './pages/Users/ProductDetails';
import Cart from './pages/Users/Cart';
import Checkout from './pages/Users/CheckOut';

function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<WelCome />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add" element={<AddMobile />} />
          <Route path="/admin/edit/:id" element={<AddMobile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart"element={<Cart />}/>
            <Route path="/checkout"element={<Checkout />}/>

        </Routes>
      </div>
    </>
  );
}

export default App;
