// src/components/PlanetDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlanetDetails = () => {
  const { name } = useParams();
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/?search=${name}`);
        const data = await response.json();

        if (data.results.length === 0) {
          throw new Error(`Planet with name "${name}" not found.`);
        }

        setPlanet(data.results[0]);
        setResidents(data.results[0].residents);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPlanetDetails();
  }, [name]);

  // Function to fetch resident details asynchronously
  const fetchResidentsDetails = async () => {
    const residentsData = await Promise.all(
      residents.map(async (residentURL) => {
        const response = await fetch(residentURL);
        return response.json();
      })
    );
    setResidents(residentsData);
  };

  // Fetch residents' details when the component mounts
  useEffect(() => {
    if (residents.length > 0) {
      fetchResidentsDetails();
    }
  }, [residents]);

  return (
    <div className="planet-details">
      {/* Stars */}
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="star" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}></div>
        ))}
      </div>

      {planet ? (
        <>
          <h2>{planet.name}</h2>
          <p>Rotation Period: {planet.rotation_period}</p>
          <p>Orbital Period: {planet.orbital_period}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Climate: {planet.climate}</p>
          <p>Gravity: {planet.gravity}</p>
          <p>Terrain: {planet.terrain}</p>
          <p>Surface Water: {planet.surface_water}</p>
          <p>Population: {planet.population}</p>

          {residents.length > 0 && (
            <>
              <h3>Residents:</h3>
              <ul>
                {residents.map((resident, index) => (
                  <li key={index}>
                    {resident.name} - Height: {resident.height}, Mass: {resident.mass}, Gender: {resident.gender}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p>{error || 'Loading planet details...'}</p>
      )}
    </div>
  );
};

export default PlanetDetails;
