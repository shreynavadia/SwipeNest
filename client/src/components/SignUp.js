import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Sign up successful"); // Set the success message
      setTimeout(() => {
        navigate('/login'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
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
    position: 'relative',
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

  const successMessageStyle = {
    position: 'absolute',
    top: '-30px',
    fontSize: '14px',
    color: '#4CAF50',
    textAlign: 'center',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignUp} style={formStyle}>
        <div style={titleStyle}>Sign Up</div>
        {successMessage && <div style={successMessageStyle}>{successMessage}</div>}
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
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
