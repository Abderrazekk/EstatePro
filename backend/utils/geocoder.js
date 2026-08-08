const fetch = require('node-fetch');

const geocodeAddress = async (addressObj) => {
  const { street, city, state, zipCode, country } = addressObj;
  // Build a query string from available parts
  const parts = [street, city, state, zipCode, country].filter(Boolean);
  const query = parts.join(', ');
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

module.exports = geocodeAddress;