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
  const [city, setCity] = useState('');
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
      if (!/^1|2|3|4|5/.test(propertyCertificateNumber)) {
        alert('Certificate invalid, verification unsuccessful.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;
      const selectedAmenities = Object.keys(amenities).filter((amenity) => amenities[amenity]);

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
        coverPhoto, 
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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Landlord Sign Up</h2>
      <form onSubmit={handleSignUp} className="card p-4 shadow">
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>City</label>
          <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Properties Owned</label>
          <input type="number" className="form-control" placeholder="Properties Owned" value={propertiesOwned} onChange={(e) => setPropertiesOwned(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label>Property Name</label>
          <input type="text" className="form-control" placeholder="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label>Property Address</label>
          <input type="text" className="form-control" placeholder="Property Address" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="col mb-3">
            <label>Bedrooms</label>
            <input type="number" className="form-control" placeholder="Bedrooms" value={bedrooms} min="1" max="10" onChange={(e) => setBedrooms(e.target.value)} />
          </div>
          <div className="col mb-3">
            <label>Bathrooms</label>
            <input type="number" className="form-control" placeholder="Bathrooms" value={bathrooms} min="1" max="10" onChange={(e) => setBathrooms(e.target.value)} />
          </div>
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea className="form-control" placeholder="Description (max 250 chars)" value={description} onChange={(e) => setDescription(e.target.value)} maxLength="250" />
        </div>
        <div className="form-group mb-3">
          <label>Property Certificate Number</label>
          <input type="text" className="form-control" placeholder="Property Certificate Number" value={propertyCertificateNumber} onChange={(e) => setPropertyCertificateNumber(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Square Footage</label>
          <input type="number" className="form-control" placeholder="Square Footage" value={squareFootage} onChange={(e) => setSquareFootage(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label>Upload Cover Photo</label>
          <input type="file" className="form-control" onChange={handleCoverPhotoChange} />
        </div>
        <div className="form-group mb-3">
          <label>Amenities:</label>
          <div className="d-flex flex-wrap">
            {Object.keys(amenities).map((amenity) => (
              <div key={amenity} className="form-check mr-3">
                <input type="checkbox" className="form-check-input" id={amenity} name={amenity} checked={amenities[amenity]} onChange={handleAmenityChange} />
                <label className="form-check-label" htmlFor={amenity}>
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign Up as Landlord</button>
      </form>
    </div>
  );
};

export default LandlordSignUp;
