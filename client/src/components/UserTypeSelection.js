import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleTenantClick = () => {
    navigate('/signup-tenant');
  };

  const handleLandlordClick = () => {
    navigate('/signup-landlord');
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

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Select Account Type</div>
      <button onClick={handleTenantClick} style={buttonStyle}>I am a Tenant</button>
      <button onClick={handleLandlordClick} style={buttonStyle}>I am a Landlord</button>
    </div>
  );
};

export default UserTypeSelection;
