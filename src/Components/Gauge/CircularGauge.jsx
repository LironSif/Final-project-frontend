import React from 'react';

const colorMapping = {
  "Total Chemicals": "blue",
  "Flammable": "red",
  "Corrosive": "orange",
  "Oxidizers": "green"
};

const CircularGauge = ({ label, value, max }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;
  const gaugeColor = colorMapping[label] || "gray"; // Default color if label not found

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: gaugeColor,
    marginTop: '10px'
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <svg width={100} height={100} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth={12}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={12}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90, 50, 50)"
        />
      </svg>
      <div style={labelStyle}>{label}: {value} / {max}</div>
    </div>
  );
};

export default CircularGauge;
