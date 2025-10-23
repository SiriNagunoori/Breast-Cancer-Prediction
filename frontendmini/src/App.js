import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
import Result from './Result';
import Awareness from './Awareness';
import Navigation from './Navigation';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page without navbar */}
        <Route path="/" element={<LandingPage />} />

        {/* Pages with navbar */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/result"
          element={
            <>
              <Navbar />
              <Result />
            </>
          }
        />
        <Route
          path="/awareness"
          element={
            <>
              <Navbar />
              <Awareness />
            </>
          }
        />
        <Route
          path="/navigation"
          element={
            <>
              <Navbar />
              <Navigation />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

