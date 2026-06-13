import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createQuery } from "../../utils/ai";
import "./WritingPage.css";
import { checkPrompt } from "../../utils/strings";

function WritingPage({ keyPoints }) {
  const navigate = useNavigate();
  const [recallText, setRecallText] = useState("");
  const [checkResults, setCheckResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function generateCheckResults() {
    if (recallText.length > 0) {
      setIsLoading(true);
      try {
        const result = await createQuery(checkPrompt(keyPoints, recallText));
        setCheckResults(result);
      } catch (error) {
        console.error("Error checking recall:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <textarea
        id="originalText"
        name="message"
        rows="10"
        cols="50"
        placeholder="Paste the text you want to memorize here"
        value={recallText}
        onChange={(e) => setRecallText(e.target.value)}
      />
      <div>
        <button onClick={generateCheckResults} disabled={isLoading || recallText.length === 0}>
          {isLoading ? "Checking..." : "Check"}
        </button>
        <button onClick={() => navigate("/text")}>Go back to text</button>
      </div>
      <div>
        <p className={checkResults ? "results" : "hidden"}>
          Скибиди: {checkResults}
        </p>
      </div>
    </>
  );
}

export default WritingPage;
