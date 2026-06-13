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
      setCheckResults(null);
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

  function handleReset() {
    setCheckResults(null);
    setRecallText("");
  }

  const parsedResults = (() => {
    if (!checkResults) return null;
    try {
      return JSON.parse(checkResults);
    } catch (e) {
      const match = checkResults.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (err) {
          return null;
        }
      }
    }
    return null;
  })();

  const showResultsView = isLoading || checkResults !== null;

  return (
    <div className="writing-container">
      {!showResultsView ? (
        /* Input Mode */
        <div className="writing-input-mode">
          <h2>Write what you recall</h2>
          <textarea
            id="recallTextarea"
            name="message"
            placeholder="Write everything you remember from the text here..."
            value={recallText}
            onChange={(e) => setRecallText(e.target.value)}
          />
          <div className="writing-buttons">
            <button
              onClick={generateCheckResults}
              disabled={recallText.trim().length === 0}
              className="action-btn"
            >
              Check
            </button>
            <button
              onClick={() => navigate("/text")}
              className="action-btn secondary-btn"
            >
              Go back to text
            </button>
          </div>
        </div>
      ) : (
        <div className="writing-results-mode">
          <div className="results-left">
            <div id="paper" className="recall-paper">
              {recallText}
            </div>
            <div className="results-actions">
              <button onClick={handleReset} className="action-btn">
                Try again
              </button>
              <button
                onClick={() => navigate("/text")}
                className="action-btn secondary-btn"
              >
                Go back to text
              </button>
            </div>
          </div>

          {/* Feedback window */}
          <div className="results-right">
            <div className="feedback-window">
              {isLoading ? (
                <div className="loading-container">
                  <p className="loading-text">Comparing text</p>
                </div>
              ) : parsedResults ? (
                <div className="feedback-content">
                  <h2>Correct</h2>
                  {parsedResults.correct && parsedResults.correct.length > 0 ? (
                    <ul>
                      {parsedResults.correct.map((point, index) => (
                        <li key={index} className="correct-item">
                          <i className="bi bi-check-circle-fill"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-msg">
                      No correct points identified. Awkward.
                    </p>
                  )}

                  {parsedResults.incorrect &&
                    parsedResults.incorrect.length > 0 && (
                      <>
                        <h2>Incorrect</h2>
                        <ul>
                          {parsedResults.incorrect.map((point, index) => (
                            <li key={index} className="incorrect-item">
                              <i className="bi bi-x-circle-fill"></i>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                  <h2>Missing</h2>
                  {parsedResults.missing && parsedResults.missing.length > 0 ? (
                    <ul>
                      {parsedResults.missing.map((point, index) => (
                        <li key={index} className="missing-item">
                          <i className="bi bi-dash-circle-fill"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-msg">
                      No missing points! Awesomesauce!
                    </p>
                  )}

                  <h2>Hallucinations</h2>
                  {parsedResults.hallucinations &&
                  parsedResults.hallucinations.length > 0 ? (
                    <ul>
                      {parsedResults.hallucinations.map((point, index) => (
                        <li key={index} className="hallucination-item">
                          <i className="bi bi-exclamation-triangle-fill"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-msg">No hallucinations detected.</p>
                  )}
                </div>
              ) : (
                /* Error Fallback */
                <div className="feedback-error">
                  <h3>Could not parse evaluation</h3>
                  <p>Here is the raw response from the AI:</p>
                  <pre className="raw-response">{checkResults}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WritingPage;
