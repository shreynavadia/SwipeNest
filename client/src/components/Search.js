// client/src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import PropertyCards from './PropertyCards';

const Search = () => {
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [properties, setProperties] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/users/properties', {
        params: {
          city,
          bedrooms,
          bathrooms
        }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Failed to fetch properties.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Find Your Ideal Property</h3>
        <form onSubmit={handleSearch}>
          <div className="row mb-3">
            <div className="col-md-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-4">
              <input 
                type="number" 
                className="form-control" 
                placeholder="Bedrooms" 
                value={bedrooms} 
                onChange={(e) => setBedrooms(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-4">
              <input 
                type="number" 
                className="form-control" 
                placeholder="Bathrooms" 
                value={bathrooms} 
                onChange={(e) => setBathrooms(e.target.value)} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Search</button>
        </form>
      </div>

      {properties.length > 0 && (
        <div className="mt-4">
          <PropertyCards properties={properties} />
        </div>
      )}
    </div>
  );
};

export default Search;
