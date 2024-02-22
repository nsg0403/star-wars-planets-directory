// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanetsList from './components/PlanetsList';
import PlanetDetails from './components/PlanetDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Star Wars Planets Directory</h1>
        <Routes>
          <Route path="/" element={<PlanetsList />} />
          <Route path="/planet/:name" element={<PlanetDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

