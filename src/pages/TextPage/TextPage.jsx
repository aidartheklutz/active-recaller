import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { createQuery } from "../../utils/ai";
import { summarizePrompt } from "../../utils/strings";

function TextPage({ originalText, setKeyPoints, keyPoints, lastProcessedText, setLastProcessedText }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function redirectToWriting() {
    if (keyPoints && !isLoading) navigate("/text/writing");
  }

  useEffect(() => {
    // If keyPoints already exist and originalText matches lastProcessedText, skip API call
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
  }, [originalText, lastProcessedText, keyPoints, setKeyPoints, setLastProcessedText]);

  return (
    <div>
      <p>{originalText}</p>
      <button onClick={redirectToWriting} disabled={isLoading || !keyPoints}>
        {isLoading ? "Generating key points..." : "I'm ready"}
      </button>
    </div>
  );
}

export default TextPage;
