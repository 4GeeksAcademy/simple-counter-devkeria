import React from "react";

const digitStyle = {
  backgroundColor: "#333",
  color: "white",
  fontSize: "4rem",
  fontWeight: "bold",
  fontFamily: "monospace",
  padding: "20px",
  margin: "5px",
  borderRadius: "8px",
  minWidth: "60px",
  textAlign: "center",
  boxShadow: "0 0 10px #0ff",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};

function SecondsCounter({ seconds }) {
  const padded = seconds.toString().padStart(6, "0");
  const digits = padded.split("");

  return (
    <div style={containerStyle}>
      {digits.map((digit, idx) => (
        <div key={idx} style={digitStyle}>
          {digit}
        </div>
      ))}
    </div>
  );
}

export default SecondsCounter;