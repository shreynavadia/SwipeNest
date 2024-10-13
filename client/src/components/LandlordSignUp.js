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
  const [city, setCity] = useState(''); // New field for city
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [description, setDescription] = useState('');
  const [propertyCertificateNumber, setPropertyCertificateNumber] = useState('');
  const [squareFootage, setSquareFootage] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [amenities, setAmenities] = useState({
    pool: false,
    gym: false,
    laundry: false,
    dishwasher: false,
    aircon: false,
    balcony: false,
  });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Simulate certificate verification
      if (!/^1|2|3|4|5/.test(propertyCertificateNumber)) {
        alert('Certificate invalid, verification unsuccessful.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;

      // Convert selected amenities to an array
      const selectedAmenities = Object.keys(amenities).filter((amenity) => amenities[amenity]);

      // Send user data to the backend to store in MongoDB
      await axios.post('/api/users/landlord', {
        firebaseUID,
        email,
        name,
        phone,
        city,
        propertiesOwned,
        propertyName,
        propertyAddress,
        bedrooms,
        bathrooms,
        description,
        propertyCertificateNumber,
        squareFootage,
        amenities: selectedAmenities,
        coverPhoto, // Cover photo handling may need additional implementation for file upload
      });

      navigate('/login');
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked,
    }));
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <input type="number" placeholder="Properties Owned" value={propertiesOwned} onChange={(e) => setPropertiesOwned(e.target.value)} />
      <input type="text" placeholder="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
      <input type="text" placeholder="Property Address" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
      <input type="number" placeholder="Bedrooms" value={bedrooms} min="1" max="10" onChange={(e) => setBedrooms(e.target.value)} />
      <input type="number" placeholder="Bathrooms" value={bathrooms} min="1" max="10" onChange={(e) => setBathrooms(e.target.value)} />
      <textarea placeholder="Description (max 250 chars)" value={description} onChange={(e) => setDescription(e.target.value)} maxLength="250" />
      <input type="text" placeholder="Property Certificate Number" value={propertyCertificateNumber} onChange={(e) => setPropertyCertificateNumber(e.target.value)} required />
      <input type="number" placeholder="Square Footage" value={squareFootage} onChange={(e) => setSquareFootage(e.target.value)} />
      
      <label>Amenities:</label>
      <div>
        <label>
          <input type="checkbox" name="pool" checked={amenities.pool} onChange={handleAmenityChange} /> Pool
        </label>
        <label>
          <input type="checkbox" name="gym" checked={amenities.gym} onChange={handleAmenityChange} /> Gym
        </label>
        <label>
          <input type="checkbox" name="laundry" checked={amenities.laundry} onChange={handleAmenityChange} /> Laundry
        </label>
        <label>
          <input type="checkbox" name="dishwasher" checked={amenities.dishwasher} onChange={handleAmenityChange} /> Dishwasher
        </label>
        <label>
          <input type="checkbox" name="aircon" checked={amenities.aircon} onChange={handleAmenityChange} /> Air Conditioning
        </label>
        <label>
          <input type="checkbox" name="balcony" checked={amenities.balcony} onChange={handleAmenityChange} /> Balcony
        </label>
      </div>

      <input type="file" onChange={handleCoverPhotoChange} />
      <button type="submit">Sign Up as Landlord</button>
    </form>
  );
};

export default LandlordSignUp;