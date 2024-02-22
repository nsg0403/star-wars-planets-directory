// src/components/PlanetsList.js
import React, { useState, useEffect } from 'react';
import PlanetCard from './PlanetCard';
import '../styles/PlanetsList.css'; // Import the CSS file

const PlanetsList = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/?format=json');
        const data = await response.json();
        setPlanets(data.results);
        setNextPage(data.next);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const handleLoadMore = async () => {
    if (nextPage) {
      setLoading(true);
      try {
        const response = await fetch(nextPage);
        const data = await response.json();
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
        setNextPage(data.next);
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="planets-list">
          {planets.map((planet, index) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>
      )}

      {nextPage && (
        <button className="load-more-button" onClick={handleLoadMore} disabled={loading || !nextPage}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {/* Stars */}
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="star" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}></div>
        ))}
      </div>
    </div>
  );
};

export default PlanetsList;



