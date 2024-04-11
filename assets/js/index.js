import { data } from '/assets/utils/data.js';

// Function to render the location selector
const renderPlacesSelect = places => {
  const placesHTML = places.map(place => `<option value="${place.id}">${place.name}</option>`).join('');
  document.getElementById('location').innerHTML = placesHTML; 
};

// Render the location selector
renderPlacesSelect(data);

// Function to load location information
const loadLocationInfo = locationId => {
  const location = data.find(place => place.id === parseInt(locationId));
  if (location) {
    document.getElementById('locationInfo').innerHTML = `
      <h2>${location.name}</h2>
      <span>${location.location}</span>
    `;
    initializePanorama(location.lat, location.lng);
  } else {
    document.getElementById('locationInfo').innerHTML = "<p>Location not found.</p>";
  }
};

// Event listener for the location selector
document.getElementById('location').addEventListener('change', function() {
  const selectedLocationId = this.value;  
  loadLocationInfo(selectedLocationId);
});

// Function to update the selected location
const updateSelectedLocation = randomLocationId => {
  document.getElementById('location').value = randomLocationId;
};

// Function to generate a random location
const generateRandomLocation = selectedLocationId => {
  const filteredData = data.filter(place => place.id !== parseInt(selectedLocationId));
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
};

// Event listener for the button that generates a random location
document.getElementById('randomLocationButton').addEventListener('click', () => {
  const selectedLocationId = document.getElementById('location').value;
  const randomLocation = generateRandomLocation(selectedLocationId);
  updateSelectedLocation(randomLocation.id);
  loadLocationInfo(randomLocation.id);
});

// GOOGLE MAPS

// Function to load the Google Maps script
function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNJL6DkEWTBkh3Em--OI6gFfO7haPklvA&callback=initializePanorama&v=weekly`;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);
    window.initializePanorama = resolve;
  });
}

// Function to initialize the Street View Panorama
function initializePanorama(latitude, longitude) {
  const fenway = { lat: latitude, lng: longitude };
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
}

// Initialization of Google Maps and loading of information for the first location
loadGoogleMapsScript()
  .then(() => {
    loadLocationInfo(1);
  })
  .catch(error => {
    console.error('Error loading Google Maps API script:', error);
});
