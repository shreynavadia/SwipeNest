import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandlordSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertiesOwned, setPropertiesOwned] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;

      // Send user data to the backend to store in MongoDB
      await axios.post('/api/users/landlord', {
        firebaseUID,
        email,
        name,
        phone,
        propertiesOwned,
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
      <input type="number" placeholder="Properties Owned" value={propertiesOwned} onChange={(e) => setPropertiesOwned(e.target.value)} />
      <button type="submit">Sign Up as Landlord</button>
    </form>
  );
};

export default LandlordSignUp;
