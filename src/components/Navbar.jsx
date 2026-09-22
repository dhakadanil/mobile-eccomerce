import React from 'react';
import { Link } from 'react-router'; 

function Navbar() {
  return (
    <nav className="premium-navbar">
      <div className="navbar-logo">
        📱 Mobile<span>Shop</span>
      </div>

      <div className="navbar-links-group">
        <Link to="/" className="nav-link-user">
          🛒 User Store
        </Link>
        <Link to="/admin" className="nav-link-admin">
          💻 Admin Panel
        </Link>
      </div>

      <style>{`
        .premium-navbar {
          padding: 15px 40px;
          background: #111827;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-logo {
          color: #ffffff;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .navbar-logo span {
          color: #00adb5;
        }

        .navbar-links-group {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .nav-link-user {
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          background: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-user:hover {
          background: #374151;
          transform: translateY(-1px);
        }

        .nav-link-admin {
          color: #0f172a;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.25);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-admin:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
        }

        /* 📱 Strict Responsive Layout Control for Mobile Views */
        @media (max-width: 580px) {
          .premium-navbar {
            padding: 12px 16px !important; /* Compact comfortable mobile margins */
            flex-direction: column !important; /* Stack elements or push spacing vertically */
            gap: 12px !important;
          }
          
          .navbar-logo {
            font-size: 19px !important; /* Perfect balance for smaller device headers */
          }

          .navbar-links-group {
            width: 100% !important; /* Row stretch implementation */
            justify-content: center !important;
            gap: 10px !important;
          }

          .nav-link-user, .nav-link-admin {
            flex: 1 !important; /* Equal grid distribution on tiny phone screens */
            text-align: center !important;
            padding: 10px 12px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
