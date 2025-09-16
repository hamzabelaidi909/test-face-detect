import React from "react";
import "./Red3DButton.css";

export default function Red3DButton({ onClick }) {
  return (
    <button
      className="red3d"
      onClick={onClick}
    >
      Stop
    </button>
  );
}
