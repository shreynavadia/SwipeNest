// client/src/components/PropertyCards.js
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';

const PropertyCards = ({ properties, tenantId }) => {
  const [index, setIndex] = useState(0);

  const handleSwipe = async (newIndex) => {
    if (newIndex > index) {
      // Swipe right
      try {
        await axios.post(`/api/users/tenant/${tenantId}/save-property`, {
          propertyId: properties[index]._id
        });
        alert('Property saved!');
      } catch (error) {
        console.error('Error saving property:', error);
      }
    }

    // Update the index for next property
    if (newIndex < properties.length) {
      setIndex(newIndex);
    } else {
      alert("You've gone through all the properties!");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <SwipeableViews
        index={index}
        onChangeIndex={(newIndex) => {
          if (newIndex !== index) {
            handleSwipe(newIndex);
          }
        }}
      >
        {properties.map((property) => (
          <div key={property._id} style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px' }}>
            <img
              src={property.coverPhoto || 'https://media.apts247.info/c5/c56bb974e1654031a72e0f55847c3e4b/hero_shot/community/community-amenities.jpg'}
              alt={property.propertyName}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '20px'
              }}
            >
              <h3>{property.propertyName}</h3>
              <p>{property.description}</p>
              <p>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</p>
            </div>
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default PropertyCards;
