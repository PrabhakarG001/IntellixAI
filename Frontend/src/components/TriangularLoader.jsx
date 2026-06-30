import React from 'react';
import '../styles/TriangularLoader.css';

export default function TriangularLoader() {
  return (
    <div className="triangular-loader">
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </div>
  );
}
