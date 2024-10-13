// client/src/components/TenantSignUp.js
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TenantSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;

      // Send user data to the backend to store in MongoDB
      await axios.post('/api/users/tenant', {
        firebaseUID,
        email,
        name,
        phone,
        preferredLocation,
      });

      navigate('/login');
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tenant Sign Up</h2>
      <form onSubmit={handleSignUp} className="card p-4 shadow">
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Preferred Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Preferred Location"
            value={preferredLocation}
            onChange={(e) => setPreferredLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign Up as Tenant</button>
      </form>
    </div>
  );
};

export default TenantSignUp;
