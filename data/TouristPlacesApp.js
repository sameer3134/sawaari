import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGeolocated } from 'react-geolocated';

// Helper component to dynamically re-center the map
const MapCenterUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const TouristPlacesApp = () => {
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState(2);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [kinds, setKinds] = useState([]);
  const [selectedKinds, setSelectedKinds] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [cityMarker, setCityMarker] = useState(null);

  const API_KEY = '5ae2e3f221c38a28845f05b62d24629a3f9e6377adf959915b7dda07';

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const fetchTouristPlaces = async (lat, lon) => {
    setLoading(true);
    try {
      setMapCenter([lat, lon]);
      setCityMarker({ lat, lon, name: 'Selected Location' });

      const placesResponse = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/radius`,
        {
          params: {
            lat,
            lon,
            radius: radius * 1000, // Convert km to meters
            apikey: API_KEY,
          },
        }
      );

      const fetchedPlaces = placesResponse.data.features;

      // Extract unique kinds from the places
      const allKinds = new Set();
      fetchedPlaces.forEach((place) => {
        place.properties.kinds.split(',').forEach((kind) => allKinds.add(kind.trim()));
      });

      setPlaces(fetchedPlaces);
      setFilteredPlaces(fetchedPlaces);
      setKinds([...allKinds]);
    } catch (error) {
      console.error('Error fetching tourist places:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: 'json',
          limit: 5,
        },
      });

      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    fetchSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    setCity(suggestion.display_name);
    setShowSuggestions(false);
    fetchTouristPlaces(suggestion.lat, suggestion.lon);
  };

  const filterPlacesByKinds = () => {
    if (selectedKinds.length > 0) {
      const filtered = places.filter((place) => {
        const placeKinds = place.properties.kinds.split(',');
        return selectedKinds.some((kind) => placeKinds.includes(kind));
      });
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places); // Show all places if no kinds are selected
    }
  };

  useEffect(() => {
    filterPlacesByKinds();
  }, [selectedKinds]);

  const handleKindChange = (e) => {
    const kind = e.target.value;
    if (selectedKinds.includes(kind)) {
      setSelectedKinds(selectedKinds.filter((k) => k !== kind));
    } else {
      setSelectedKinds([...selectedKinds, kind]);
    }
  };



  return (
    <div className="container mx-auto p-6">
      <header className="bg-blue-600 text-white p-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold text-center">Tourist Places Finder</h1>
        <p className="text-center mt-2 text-lg">
          Discover amazing places around you or in any city worldwide.
        </p>
      </header>
  
      {/* Search Section */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      <div className="relative">
  <input
    type="text"
    value={city}
    onChange={handleInputChange}
    placeholder="Enter city or locality name"
    className="border p-3 rounded w-full focus:outline-blue-500"
  />
  {showSuggestions && suggestions.length > 0 && (
    <ul
      className="absolute z-50 bg-white border border-gray-200 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSuggestionSelect(suggestion)}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Radius (km)"
          className="border p-3 rounded shadow-sm w-1/4 focus:outline-blue-500"
        />
        <button
          onClick={() => {
            if (cityMarker) {
              fetchTouristPlaces(cityMarker.lat, cityMarker.lon);
            } else {
              alert('Please select a city or location.');
            }
          }}
          className={`bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition`}
        >
          Search
        </button>
      </div>
  
      {/* Filter Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Filter by Kinds</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {kinds.map((kind, index) => (
            <label
              key={index}
              className="flex items-center p-2 border rounded shadow-sm cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                value={kind}
                checked={selectedKinds.includes(kind)}
                onChange={handleKindChange}
                className="mr-2"
              />
              {kind}
            </label>
          ))}
        </div>
      </div>
  
      {/* Results and Map Section */}
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '400px', width: '100%' , zIndex: "1"}}
          >
            <MapCenterUpdater center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {cityMarker && (
              <Marker
                position={[cityMarker.lat, cityMarker.lon]}
                icon={L.icon({
                  iconUrl:
                    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })}
              >
                <Popup>
                  <strong>{cityMarker.name}</strong>
                </Popup>
              </Marker>
            )}
            {filteredPlaces.map((place, index) => {
                const name = place.properties.name;
                const dist = place.properties.dist;
     
                if (!name) return null;
              return(
              <Marker
                key={index}
                position={[
                  place.geometry.coordinates[1],
                  place.geometry.coordinates[0],
                ]}
                icon={L.icon({
                  iconUrl:
                    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })}
              >
                <Popup>
                  <strong>{name}</strong>
                  <br />
                  Distance: {dist.toFixed(2)} m
                </Popup>
              </Marker>
            )})}
          </MapContainer>

          <h2 className="text-xl font-semibold mb-3 bg-blue-500 text-white my-5 py-3">Places Found</h2>
          <div className="space-y-4">
          <table className='w-full '>
                <thead className='bg-gray-100'>
                  <th></th>
                  <th>NAME</th>
                  <th>RATE</th>
                  <th>DISTANCE</th>
                </thead>
                <tbody>  
                  {filteredPlaces ? filteredPlaces.map((place, id) => {
           const name = place.properties.name;
           const rate = place.properties.rate;

           if (!name) return null;
           console.log(id)
           return (
             <div key={id+1}><tr className={` ${id%2!=0? "bg-gray-400":""}`}>
              <td>{id+1}</td>
                  <td>{name}</td>
                  <td>{rate}</td>
                  <td>{place.properties.dist.toFixed(2)}</td>
                  </tr>
                  </div>
           )
        }):<> Select valid location</>} </tbody>
              </table>
          </div>
   
  
        {/* Map */}

    </div>
  );
  
};

export default TouristPlacesApp;


// import React from 'react';
// import logo from '../assets/sawaari_logo.png';
// import bike from "../assets/bike.png"

// const Header = () => {
//     return (
//         <div>
//             {/*  navbar */}
//             <div className="text-gray-600 body-font">
//                 <div className="container px-8  mx-auto">
//                     <a className="w-12 h-12 md:h-16 md:w-16 p-2 rounded-full flex title-font font-medium">
//                         <img alt="logo" src={logo} />
//                         <span
//                             style={{
//                                 background: "linear-gradient(90deg, #54ff98, #508aff)",
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                             }}
//                             className="ml-3 text-2xl mt-0 md:mt-2"
//                         >
//                             Sawaari
//                         </span>
//                     </a>
//                 </div>
//             </div>
//             {/* end navbar */}
//             <section class="text-gray-600 body-font overflow-hidden">
//     <div class="container px-5 py-3 mx-auto">
//         <div class="lg:w-4/5 mx-auto flex flex-wrap">
//             {/* Image Section */}
//             <img
//                 alt="ecommerce"
//                 class="w-1/2 lg:h-auto md:h-64 h-30 object-cover object-center rounded"
//                 src={bike}
//             />
//             {/* Text Section */}
//             <div class="w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col items-center justify-center">
//                 <h1
//                     class="text-gray-900 text-3xl md:text-8xl title-font font-medium"
//                     style={{
//                         background: "linear-gradient(90deg, #54ff98, #508aff)",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                     }}
//                 >
//                     Book Once Ride Daily...
//                 </h1>
//                 {/* Button section aligned to the right */}
//                 <div className="mt-8 flex justify-end w-full">
//                     <button className="text-white py-4 px-8 rounded-full" style={{ backgroundColor:"#0ccda6"}}>
//                         Know more
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>


//             <div class="relative w-full h-32 bg-gray-800 flex flex-col justify-between">
//                 <div class="flex-grow"></div>
//                 <div class="h-3 w-full border-t-2 border-dashed border-white"></div>
//                 <div class="flex-grow"></div>
//             </div>
//         </div>
//     );
// };

// export default Header;
