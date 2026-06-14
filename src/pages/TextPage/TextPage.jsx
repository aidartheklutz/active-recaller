import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { createQuery } from "../../utils/ai";
import { summarizePrompt } from "../../utils/strings";
import "./TextPage.css";

function TextPage({
  originalText,
  setKeyPoints,
  keyPoints,
  lastProcessedText,
  setLastProcessedText,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [randomTitle] = useState(() => {
    const titles = [
      "Grasp it in...",
      "Understand it...",
      "Memorize...",
      "Read carefully...",
      "Absorb the knowledge...",
      "Focus on details...",
      "Take it in...",
      "Let that sink in...",
      "Take your time...",
      "Take a moment...",
      "Don't skim, take your time...",
      "This is simpler than it looks...",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  });

  function redirectToWriting() {
    if (keyPoints && !isLoading) navigate("/text/writing");
  }

  useEffect(() => {
    if (keyPoints && originalText === lastProcessedText) {
      return;
    }

    async function generateKeyPoints() {
      setIsLoading(true);
      try {
        const result = await createQuery(summarizePrompt(originalText));
        setKeyPoints(result);
        setLastProcessedText(originalText);
      } catch (error) {
        console.error("Error generating key points:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (originalText) {
      generateKeyPoints();
    }
  }, [
    originalText,
    lastProcessedText,
    keyPoints,
    setKeyPoints,
    setLastProcessedText,
  ]);

  return (
    <>
      <h1 className="reading-title">{randomTitle}</h1>
      <div className="reading">
        <p id="paper">{originalText}</p>
        <div className="explanation">
          <p>
            Carefully read the text. When you feel like you're ready, press the
            "I'm ready" button to move on to the writing part.
          </p>
          <button
            onClick={redirectToWriting}
            disabled={isLoading || !keyPoints}
          >
            {isLoading ? "Generating key points..." : "I'm ready"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TextPage;
