import React from "react";
import { Navigate, useNavigate } from "react-router";
import "./HomePage.css";
import logo from "/active-recaller.png";

function HomePage({ originalText, setOriginalText }) {
  const navigate = useNavigate();
  function handleStartButton() {
    if (originalText.length > 10) {
      navigate("/text");
    }
  }

  return (
    <>
      <div className="introduction">
        <div className="introduction-title">
          <img src={logo} />
          <h1>Active Recaller</h1>
        </div>
        <p>Paste the text you want to memorize and hit start!</p>
        <div className="original-text-input">
          <textarea
            id="originalText"
            name="message"
            rows="10"
            cols="50"
            placeholder="Paste the text you want to memorize here"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
          <button onClick={handleStartButton} id="homeStartButton">
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
