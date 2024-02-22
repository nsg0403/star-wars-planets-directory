// src/components/PlanetCard.js
// src/components/PlanetCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlanetCard = ({ planet }) => {
  const [error, setError] = useState(null);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>

      {error ? (
        <p style={{ color: 'red' }}>Error fetching residents: {error}</p>
      ) : (
        <Link to={`/planet/${planet.name.toLowerCase().replace(/\s/g, '-')}`}>
          <button>Read More</button>
        </Link>
      )}
    </div>
  );
};

export default PlanetCard;

