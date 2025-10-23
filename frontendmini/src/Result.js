import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  const resultColor = prediction?.includes("Malignant") ? "#c1121f" : "#198754";

  return (
    <div
      style={{
        minHeight: '76vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ffe5ec, #f8f9fa)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '350px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: resultColor, fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Test Result
        </h1>
        {prediction ? (
          <p style={{ fontSize: '1.2rem', color: resultColor, fontWeight: '600', marginBottom: '2rem' }}>
            {prediction}
          </p>
        ) : (
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
            No result to display
          </p>
        )}
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: resultColor,
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.5rem 2rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

