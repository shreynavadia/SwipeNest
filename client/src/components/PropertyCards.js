// client/src/components/PropertyCards.js
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const PropertyCards = ({ properties }) => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <SwipeableViews>
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
