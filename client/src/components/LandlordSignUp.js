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
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyCertificateNumber, setPropertyCertificateNumber] = useState('');
  const [squareFootage, setSquareFootage] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null); // For file upload
  const navigate = useNavigate();

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities(checked ? [...amenities, value] : amenities.filter(a => a !== value));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;

      // Create FormData to include file upload
      const formData = new FormData();
      formData.append('firebaseUID', firebaseUID);
      formData.append('email', email);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('propertiesOwned', propertiesOwned);
      formData.append('propertyName', propertyName);
      formData.append('propertyAddress', propertyAddress);
      formData.append('propertyCertificateNumber', propertyCertificateNumber);
      formData.append('squareFootage', squareFootage);
      formData.append('bedrooms', bedrooms);
      formData.append('bathrooms', bathrooms);
      formData.append('description', description);
      formData.append('amenities', JSON.stringify(amenities)); // Send as JSON string
      if (coverPhoto) {
        formData.append('coverPhoto', coverPhoto);
      }

      // Send formData to backend
      await axios.post('/api/users/landlord', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/login');
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} encType="multipart/form-data">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="number" placeholder="Properties Owned" value={propertiesOwned} onChange={(e) => setPropertiesOwned(e.target.value)} />
      <input type="text" placeholder="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
      <input type="text" placeholder="Property Address" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
      <input type="text" placeholder="Property Certificate Number" value={propertyCertificateNumber} onChange={(e) => setPropertyCertificateNumber(e.target.value)} />
      <input type="number" placeholder="Square Footage" value={squareFootage} onChange={(e) => setSquareFootage(e.target.value)} />
      <input type="number" placeholder="Number of Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
      <input type="number" placeholder="Number of Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength="250"></textarea>

      <div>
        <label>
          <input type="checkbox" value="pool" onChange={handleAmenityChange} /> Pool
        </label>
        <label>
          <input type="checkbox" value="gym" onChange={handleAmenityChange} /> Gym
        </label>
        <label>
          <input type="checkbox" value="laundry" onChange={handleAmenityChange} /> Laundry
        </label>
        <label>
          <input type="checkbox" value="dishwasher" onChange={handleAmenityChange} /> Dishwasher
        </label>
        <label>
          <input type="checkbox" value="aircon" onChange={handleAmenityChange} /> Air Conditioning
        </label>
        <label>
          <input type="checkbox" value="balcony" onChange={handleAmenityChange} /> Balcony
        </label>
      </div>

      <input type="file" onChange={(e) => setCoverPhoto(e.target.files[0])} />
      <button type="submit">Sign Up as Landlord</button>
    </form>
  );
};

export default LandlordSignUp;
