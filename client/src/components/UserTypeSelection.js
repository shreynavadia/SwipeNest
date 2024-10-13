import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to where your logo image is stored

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleTenantClick = () => {
    navigate('/signup-tenant');
  };

  const handleLandlordClick = () => {
    navigate('/signup-landlord');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  };

  const buttonStyle = {
    padding: '15px 30px',
    margin: '10px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '200px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const logoStyle = {
    width: '600px', // Adjust width as needed
    marginBottom: '20px',
  };

  const loginLinkStyle = {
    marginTop: '20px',
    fontSize: '16px',
    color: '#4CAF50',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <div style={titleStyle}>Select Account Type</div>
      <button onClick={handleTenantClick} style={buttonStyle}>I am a Tenant</button>
      <button onClick={handleLandlordClick} style={buttonStyle}>I am a Landlord</button>
      <div style={loginLinkStyle} onClick={handleLoginClick}>
        Already have an account? Login
      </div>
    </div>
  );
};

export default UserTypeSelection;
