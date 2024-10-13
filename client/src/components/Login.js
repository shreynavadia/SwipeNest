import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <div style={titleStyle}>Login</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

export default Login;
