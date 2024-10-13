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
    <form onSubmit={handleSignUp}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Preferred Location" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} />
      <button type="submit">Sign Up as Tenant</button>
    </form>
  );
};

export default TenantSignUp;
