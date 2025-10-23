import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LandingPage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/Cancer Freedom Icon.json`)
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div
      style={{
        minHeight: '93vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to right, #ffe5ec, #f8f9fa)',
        padding: '1.5rem',
      }}
    >
      {animationData && (
        <div style={{ width: '280px', maxWidth: '90%' }}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}

      <h1 className="fw-bold" style={{ fontSize: '2.2rem', color: '#c1121f', marginTop: '1rem' }}>
        Breast Cancer Early Detection
      </h1>

      <p style={{ fontSize: '1.1rem', color: '#333', maxWidth: '600px', marginTop: '0.5rem' }}>
        Upload your mammogram or blood test report to get instant AI-powered predictions and connect with specialists near you.
      </p>

      <a
        href="/home"
        className="btn mt-4"
        style={{
          backgroundColor: '#c1121f',
          color: '#fff',
          fontSize: '1rem',
          padding: '0.75rem 2rem',
          borderRadius: '30px',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = 'black')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'black')}
      >
        Get Started →
      </a>



    </div>
  );
}


