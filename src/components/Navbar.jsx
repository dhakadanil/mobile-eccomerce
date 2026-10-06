import React, { useContext } from 'react';
import { Link } from 'react-router'; 
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav className="premium-navbar">
      <div className="navbar-logo">
        📱 Mobile<span>Shop</span>
      </div>

      <div className="navbar-links-group">
        {/* Yeh link sabko dikhega */}
        <Link to="/" className="nav-link-user">
          🛒 User Store
        </Link>

        {/* 🔐 MAGIC: Sirf tabhi dikhega jab user login ho AUR uska role 'admin' ho */}
        {user && user.role === 'admin' && (
          <Link to="/admin" className="nav-link-admin">
            💻 Admin Panel
          </Link>
        )}

        {/* 🚪 Login / Logout Status Control */}
        {user ? (
          <button onClick={logout} className="nav-logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-link-user" style={{ background: '#00adb5', color: '#ffffff' }}>
            🔑 Login
          </Link>
        )}
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

        .nav-logout-btn {
          color: #ff4d4d;
          background: #1f2937;
          border: 1px solid rgba(255, 77, 77, 0.2);
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-logout-btn:hover {
          background: #ff4d4d;
          color: white;
          transform: translateY(-1px);
        }

        /* 📱 Strict Responsive Layout Control for Mobile Views */
        @media (max-width: 580px) {
          .premium-navbar {
            padding: 12px 16px !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
          
          .navbar-logo {
            font-size: 19px !important;
          }

          .navbar-links-group {
            width: 100% !important;
            justify-content: center !important;
            gap: 10px !important;
          }

          .nav-link-user, .nav-link-admin, .nav-logout-btn {
            flex: 1 !important;
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
