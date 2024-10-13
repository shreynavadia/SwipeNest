// client/src/components/SavedProperties.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await axios.get('/api/users/saved-properties');
        setSavedProperties(response.data);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
        alert('Failed to fetch saved properties.');
      }
    };

    fetchSavedProperties();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Your Saved Properties</h3>
      <div className="row">
        {savedProperties.map((property) => (
          <div key={property._id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img
                src={property.coverPhoto || 'https://media.apts247.info/c5/c56bb974e1654031a72e0f55847c3e4b/hero_shot/community/community-amenities.jpg'}
                className="card-img-top"
                alt={property.propertyName}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{property.propertyName}</h5>
                <p className="card-text">{property.description}</p>
                <p>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
