import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // npm install react-icons

export default function Navigation() {
  const [query, setQuery] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const [mapType, setMapType] = useState('standard');
  const [history, setHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Handle window resize for responsive search
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user's location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapSrc(
          `https://www.google.com/maps?q=hospitals+and+scanning+centers+near+${latitude},${longitude}&output=embed`
        );
      },
      () => {
        setMapSrc(
          `https://www.google.com/maps?q=hospitals+near+Golconda+Telangana+India&output=embed`
        );
      }
    );
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      const encoded = encodeURIComponent(query.trim());
      const baseQuery = `hospitals and scanning centers near ${encoded}`;
      const typeParam = mapType === 'satellite' ? '&maptype=satellite' : '';
      setMapSrc(
        `https://www.google.com/maps?q=${baseQuery}${typeParam}&output=embed`
      );
      setHistory((prev) =>
        [query.trim(), ...prev.filter((item) => item !== query.trim())].slice(
          0,
          5
        )
      );
      setIsFocused(false);
    }
  };

  const toggleMapType = () => {
    setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <div
      style={{
        minHeight: '76vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ffe5ec, #f8f9fa)',
        padding: '2rem',
        position: 'relative',
      }}
    >
      <h1 style={{ color: '#c1121f', marginBottom: '1rem' }}>
        Nearby Hospitals & Scanning Centers
      </h1>
      <p
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          color: '#555',
          marginBottom: '1rem',
        }}
      >
        Automatically shows nearby locations. You can also enter a city name
        below to search manually.
      </p>

      {/* Search Input */}
      <div
        style={{
          position: 'relative',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Enter city name"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />

          {/* Desktop Search Button */}
          {!isMobile && (
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#c1121f',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                marginLeft: '0.5rem',
              }}
            >
              Search
            </button>
          )}

          {/* Mobile Search Icon */}
          {isMobile && (
            <FaSearch
              onClick={handleSearch}
              style={{
                marginLeft: '0.5rem',
                cursor: 'pointer',
                color: '#c1121f',
                fontSize: '1.2rem',
              }}
            />
          )}
        </div>

        {/* History dropdown */}
        {isFocused && history.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '3.2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '300px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1,
            }}
          >
            {history.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => {
                  setQuery(item);
                  const encoded = encodeURIComponent(item);
                  const typeParam =
                    mapType === 'satellite' ? '&maptype=satellite' : '';
                  setMapSrc(
                    `https://www.google.com/maps?q=hospitals+and+scanning+centers+near+${encoded}${typeParam}&output=embed`
                  );
                  setIsFocused(false);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  borderBottom:
                    index !== history.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {query && (
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            query
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginBottom: '1rem',
            color: '#0d6efd',
            textDecoration: 'underline',
          }}
        >
          Get Directions to {query}
        </a>
      )}

      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        }}
      >
        <iframe
          title="Nearby Hospitals"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          src={mapSrc}
        ></iframe>
      </div>
    </div>
  );
}


