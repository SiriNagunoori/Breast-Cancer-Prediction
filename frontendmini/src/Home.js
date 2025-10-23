import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const mammogramInputRef = useRef(null);
  const bloodReportInputRef = useRef(null);

  const [mammogramFile, setMammogramFile] = useState(null);
  const [mammogramPreview, setMammogramPreview] = useState(null);

  const [bloodReportFile, setBloodReportFile] = useState(null);
  const [bloodReportPreview, setBloodReportPreview] = useState(null);

  // Mammogram handlers
  const handleMammogramClick = () => mammogramInputRef.current.click();
  const handleMammogramChange = (event) => {
    const file = event.target.files[0];
    setMammogramFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setMammogramPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setMammogramPreview(null);
    }
  };
  const handleRemoveMammogram = (e) => {
    e.stopPropagation();
    setMammogramFile(null);
    setMammogramPreview(null);
  };

  // Blood Report handlers
  const handleBloodReportClick = () => bloodReportInputRef.current.click();
  const handleBloodReportChange = (event) => {
    const file = event.target.files[0];
    setBloodReportFile(file);
    setBloodReportPreview(null);
  };
  const handleRemoveBloodReport = (e) => {
    e.stopPropagation();
    setBloodReportFile(null);
    setBloodReportPreview(null);
  };

  // Submit Blood Report to Flask backend (image/PDF OCR)
  const handleBloodReportSubmit = async () => {
    if (!bloodReportFile) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", bloodReportFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      // Navigate to Result page with prediction
      navigate("/result", { state: { prediction: data.predictions[0] } });
    } catch (error) {
      console.error(error);
      alert("Error uploading file. Make sure Flask backend is running.");
    }
  };

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
      <h1 className="fw-bold mb-3 text-center" style={{ color: '#c1121f' }}>
        Check Your Breast Cancer Risk
      </h1>
      <p className="text-center" style={{ maxWidth: '500px', color: '#555', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Upload a mammogram or blood test report to let our AI assist you in early detection.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        {/* Mammogram Card */}
        <div
          style={{
            width: '300px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={handleMammogramClick}
        >
          {mammogramPreview ? (
            <img src={mammogramPreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
          ) : (
            <FaUpload size={50} color="#c1121f" className="mb-3" />
          )}
          <h3 className="fw-bold mb-2" style={{ color: '#c1121f' }}>Mammogram Upload</h3>
          <p style={{ fontSize: '1rem', color: '#777', textAlign: 'center' }}>
            {mammogramFile ? mammogramFile.name : 'Click here to select scan image'}
          </p>
          <input type="file" accept="image/*" ref={mammogramInputRef} style={{ display: 'none' }} onChange={handleMammogramChange} />
          
          <button
  onClick={async (e) => {
    e.stopPropagation();
    if (!mammogramFile) return alert("Please upload a scan first");

    const formData = new FormData();
    formData.append("file", mammogramFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_mammogram", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      navigate("/result", { state: { prediction: data.predictions[0] } });
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  }}
  style={{
    backgroundColor: "#c1121f",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "0.5rem 2rem",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  }}
>
  Submit Scan
</button>



          {mammogramFile && (
            <button
              onClick={handleRemoveMammogram}
              style={{
                backgroundColor: '#fff',
                color: '#c1121f',
                border: '1px solid #c1121f',
                borderRadius: '25px',
                padding: '0.3rem 1rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '0.7rem',
              }}
            >
              Remove File
            </button>
          )}
        </div>

        {/* Blood Report Card */}
        <div
          style={{
            width: '300px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={handleBloodReportClick}
        >
          {bloodReportPreview ? (
            <img src={bloodReportPreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
          ) : (
            <FaUpload size={50} color="#198754" className="mb-3" />
          )}
          <h3 className="fw-bold mb-2" style={{ color: '#198754' }}>Blood Report Upload</h3>
          <p style={{ fontSize: '1rem', color: '#777', textAlign: 'center' }}>
            {bloodReportFile ? bloodReportFile.name : 'Click here to select report file (image/pdf)'}
          </p>
          <input type="file" accept=".png,.jpg,.jpeg,.pdf" ref={bloodReportInputRef} style={{ display: 'none' }} onChange={handleBloodReportChange} />
          <button
            onClick={handleBloodReportSubmit}
            style={{ backgroundColor: '#198754', color: '#fff', border: 'none', borderRadius: '25px', padding: '0.5rem 2rem', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}
          >
            Submit Report
          </button>
          {bloodReportFile && (
            <button
              onClick={handleRemoveBloodReport}
              style={{
                backgroundColor: '#fff',
                color: '#198754',
                border: '1px solid #198754',
                borderRadius: '25px',
                padding: '0.3rem 1rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '0.7rem',
              }}
            >
              Remove File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
