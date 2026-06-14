import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import TextPage from "./pages/TextPage/TextPage";
import WritingPage from "./pages/WritingPage/WritingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NavBar from "./components/NavBar";

function App() {
  const [keyPoints, setKeyPoints] = useState(() => {
    return localStorage.getItem("keyPoints") || "";
  });

  useEffect(() => {
    localStorage.setItem("keyPoints", keyPoints);
  }, [keyPoints]);

  const [originalText, setOriginalText] = useState(() => {
    return localStorage.getItem("text") || "";
  });

  useEffect(() => {
    localStorage.setItem("text", originalText);
  }, [originalText]);

  const [lastProcessedText, setLastProcessedText] = useState(() => {
    return localStorage.getItem("lastProcessedText") || "";
  });

  useEffect(() => {
    localStorage.setItem("lastProcessedText", lastProcessedText);
  }, [lastProcessedText]);

  return (
    <>
      <Analytics />
      <NavBar />
      <div className="content">
        <Routes>
          <Route
            index
            element={
              <HomePage
                originalText={originalText}
                setOriginalText={setOriginalText}
              />
            }
          />
          <Route
            path="/text"
            element={
              <TextPage
                originalText={originalText}
                setKeyPoints={setKeyPoints}
                keyPoints={keyPoints}
                lastProcessedText={lastProcessedText}
                setLastProcessedText={setLastProcessedText}
              />
            }
          />
          <Route
            path="/text/writing"
            element={
              <WritingPage
                originalText={originalText}
                setKeyPoints={setKeyPoints}
                keyPoints={keyPoints}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
