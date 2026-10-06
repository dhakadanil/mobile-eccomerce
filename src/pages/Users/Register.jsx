import React, { useState, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Guard: Logged-in user is page ko nahi dekh sakta
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // 🛠️ FIX: Chunki aapne name input nahi rakha, hum email se hi user ka default name nikal kar bhej rahe hain
    const defaultName = email.split("@")[0];

    const result = await register(defaultName, email, password);
    if (result.success) {
      alert("🎉 Account created successfully! Please Sign In.");
      navigate("/login"); 
    } else {
      alert(result.message);
    }
  };

  return (
    <div style={regContainer}>
      <div style={regCard}>
        <div style={logoIconStyle}>📱</div>
        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Join MobileShop today and start shopping.</p>
        
        <form onSubmit={handleRegisterSubmit}>
          <div style={inputGroupStyle}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <input 
              type="password" 
              placeholder="Create Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            style={btnStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008c93'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00adb5'}
          >
            Sign Up
          </button>
        </form>

        <div style={footerLinkStyle}>
          Already have an account? <Link to="/login" style={loginLinkStyle}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}

// Styles matching your Premium Login Page
const regContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', backgroundColor: '#f8fafc', fontFamily: "system-ui, -apple-system, sans-serif", padding: '20px', boxSizing: 'border-box' };
const regCard = { background: '#ffffff', padding: '45px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)', maxWidth: '420px', width: '100%', textAlign: 'center', border: '1px solid #edf2f7', boxSizing: 'border-box' };
const logoIconStyle = { fontSize: '40px', marginBottom: '12px' };
const titleStyle = { fontSize: '26px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.5px' };
const subtitleStyle = { fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' };
const inputGroupStyle = { marginBottom: '16px', width: '100%' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { width: '100%', padding: '14px', background: '#00adb5', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 14px rgba(0, 173, 181, 0.25)' };
const footerLinkStyle = { marginTop: '24px', fontSize: '14px', color: '#64748b' };
const loginLinkStyle = { color: '#00adb5', textDecoration: 'none', fontWeight: '600', marginLeft: '4px' };

export default Register;
