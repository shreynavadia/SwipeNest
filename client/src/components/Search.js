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
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
        <input type="number" placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
        <button type="submit">Search</button>
      </form>

      {properties.length > 0 && <PropertyCards properties={properties} />}
    </div>
  );
};

export default Search;
