import React from "react";
import { 
  FaPhoneAlt, 
  FaHandsHelping, 
  FaBookMedical, 
  FaHeartbeat, 
  FaCheckCircle, 
  FaQuestionCircle 
} from "react-icons/fa";

export default function Awareness() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to right, #ffe5ec, #fff0f3)",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Hero Section */}
      <section style={{ maxWidth: "700px", textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="fw-bold mb-3" style={{ color: "#c1121f" }}>
          🎗️ Breast Cancer Awareness & Support
        </h1>
        <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.5" }}>
          Stay informed, find verified helplines, explore trusted organizations, and learn key tips for early detection and prevention.
        </p>
      </section>

      {/* Main Awareness Cards Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          width: "100%",
          maxWidth: "1300px",
          marginBottom: "3rem",
        }}
      >
        {/* 6 Main Awareness Cards */}
        <Card title="Helplines" color="#c1121f" icon={<FaPhoneAlt color="#c1121f" size={24} />}>
          <a href="tel:18002007002" style={linkStyle}>National Cancer Helpline: 1800-200-7002</a>
          <a href="tel:08012345678" style={linkStyle}>Pink Ribbon Helpline: 080-1234-5678</a>
        </Card>

        <Card title="NGO Support" color="#198754" icon={<FaHandsHelping color="#198754" size={24} />}>
          <a href="https://www.indiancancersociety.org/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cancer Care India</a>
          <a href="https://www.pinkchainfoundation.com/events/2016/October_is_Breast_Cancer_Awareness_Month.htm" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pink Chain Campaign</a>
          <a href="https://www.sanjeevani-lifebeyondcancer.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Sanjeevani – Life Beyond Cancer</a>
        </Card>

        <Card title="Govt Schemes" color="#c1121f" icon={<FaBookMedical color="#c1121f" size={24} />}>
          <p style={{ fontSize: "0.95rem", color: "blue", textAlign: "left", lineHeight: "1.6" }}>
            • Ayushman Bharat Yojana <br />
            • Arogyasri Scheme <br />
            • Free Screening Camps by ICMR
          </p>
        </Card>

        <Card title="Resources" color="#198754" icon={<FaHeartbeat color="#198754" size={24} />}>
          <a href="https://www.who.int/news-room/fact-sheets/detail/breast-cancer" target="_blank" rel="noopener noreferrer" style={linkStyle}>WHO Breast Cancer Guide</a>
          <a href="https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/Breast_Cancer.pdf" target="_blank" rel="noopener noreferrer" style={linkStyle}>ICMR Awareness Booklets</a>
          <a href="https://www.youtube.com/watch?v=ocsZYYuEMKQ" target="_blank" rel="noopener noreferrer" style={linkStyle}>Verified YouTube Webinars</a>
        </Card>

        <Card title="Do’s & Don’ts" color="#c1121f" icon={<FaCheckCircle color="#c1121f" size={24} />}>
          <p style={{ fontSize: "0.95rem", textAlign: "left", lineHeight: "1.6" }}>
            <strong>Do:</strong> Get regular screenings, maintain healthy lifestyle, learn self-exam techniques.<br />
            <strong>Don’t:</strong> Ignore unusual changes, rely on myths or hearsay.
          </p>
        </Card>

        <Card title="Myths vs Facts" color="#198754" icon={<FaQuestionCircle color="#198754" size={24} />}>
          <p style={{ fontSize: "0.95rem", textAlign: "left", lineHeight: "1.6" }}>
            <strong>Myth:</strong> Only women with family history get breast cancer.<br />
            <strong>Fact:</strong> Most cases occur without family history.<br />
            <strong>Myth:</strong> Pain always indicates cancer.<br />
            <strong>Fact:</strong> Early-stage cancer may not cause pain.<br />
            <strong>Myth:</strong> Mammograms are unsafe.<br />
            <strong>Fact:</strong> They are safe and lifesaving.
          </p>
        </Card>

        {/* 7th card centered in 3rd row */}
        <div style={{ gridColumn: "1 / 4" }}>
          <Card title="🩺 Self-Examination Tips" color="#198754">
            <ul style={{ lineHeight: "1.8", color: "#333", textAlign: "left" }}>
              <li>Perform a self-exam once a month, ideally a week after your period ends.</li>
              <li>Look for changes in size, shape, or color of your breasts.</li>
              <li>Gently feel for lumps, thickened areas, or any unusual pain.</li>
              <li>Report any changes to a doctor immediately.</li>
            </ul>
            <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#198754" }}>
              Early detection saves lives 💗 — make it a habit!
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

/* --- Card Component --- */
function Card({ title, color, icon, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        padding: "1.5rem",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "0.8rem" }}>
        {icon}
        <h3 style={{ color }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

const linkStyle = {
  display: "block",
  marginBottom: "10px",
  color: "blue",
  textDecoration: "none",
  fontSize: "0.95rem",
};
