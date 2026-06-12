import React from "react";
import { Navigate, useNavigate } from "react-router";

function HomePage({ originalText, setOriginalText }) {
  const navigate = useNavigate();
  function handleStartButton() {
    if (originalText.length > 10) {
      navigate("/text");
    }
  }

  return (
    <>
      <h1>Active Recaller</h1>
      <textarea
        id="originalText"
        name="message"
        rows="10"
        cols="50"
        placeholder="Paste the text you want to memorize here"
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
      />
      <button onClick={handleStartButton}>Start</button>
    </>
  );
}

export default HomePage;
