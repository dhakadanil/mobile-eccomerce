import React, { useState, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  // 🛠️ FIX 1: handleLoginSubmit ko async banaya taaki await use ho sake
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // 🛠️ FIX 2: await login() kiya taaki db.json ka response aane ka wait kare
    const result = await login(email, password);
    
    if (result.success) {
      alert("🎉 Logged in successfully!");
      navigate("/"); 
    } else {
      // 🛠️ FIX 3: Agar user registered nahi hai ya password galat hai toh message dikhao
      alert(result.message || "⚠️ Invalid Email or Password!");
    }
  };

  return (
    <div style={loginContainer}>
      <div style={loginCard}>
        <div style={logoIconStyle}>📱</div>
        
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subtitleStyle}>Please enter your details to sign in.</p>
        
        <div style={hintBoxStyle}>
          💡 Tip: Use <b>admin@gmail.com</b> to unlock Admin features!
        </div>

        <form onSubmit={handleLoginSubmit}>
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
              placeholder="Password" 
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
            Sign In
          </button>
        </form>

        <div style={footerLinkStyle}>
          Don't have an account? <Link to="/register" style={registerLinkStyle}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}

const loginContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
  backgroundColor: '#f8fafc',
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: '20px',
  boxSizing: 'border-box'
};

const loginCard = {
  background: '#ffffff',
  padding: '45px 40px',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
  maxWidth: '420px',
  width: '100%',
  textAlign: 'center',
  border: '1px solid #edf2f7',
  boxSizing: 'border-box'
};

const logoIconStyle = {
  fontSize: '40px',
  marginBottom: '12px'
};

const titleStyle = {
  fontSize: '26px',
  fontWeight: '700',
  color: '#0f172a',
  margin: '0 0 6px 0',
  letterSpacing: '-0.5px'
};

const subtitleStyle = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 24px 0',
  lineHeight: '1.4'
};

const hintBoxStyle = {
  fontSize: '12.5px',
  color: '#0369a1',
  backgroundColor: '#f0f9ff',
  padding: '10px 14px',
  borderRadius: '12px',
  border: '1px solid #e0f2fe',
  marginBottom: '24px',
  lineHeight: '1.4',
  textAlign: 'left'
};

const inputGroupStyle = {
  marginBottom: '16px',
  width: '100%'
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
  color: '#0f172a',
  backgroundColor: '#f8fafc',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const btnStyle = {
  width: '100%',
  padding: '14px',
  background: '#00adb5',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
  marginTop: '10px',
  boxShadow: '0 4px 14px rgba(0, 173, 181, 0.25)',
  transition: 'background-color 0.2s ease'
};

const footerLinkStyle = {
  marginTop: '24px',
  fontSize: '14px',
  color: '#64748b'
};

const registerLinkStyle = {
  color: '#00adb5',
  textDecoration: 'none',
  fontWeight: '600',
  marginLeft: '4px'
};

export default Login;
