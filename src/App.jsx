import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import TextPage from "./pages/TextPage/TextPage";
import WritingPage from "./pages/WritingPage/WritingPage";

function App() {
  const [keyPoints, setKeyPoints] = useState(null);
  const [originalText, setOriginalText] = useState(() => {
    return localStorage.getItem("text") || "";
  });

  useEffect(() => {
    localStorage.setItem("text", originalText);
  }, [originalText]);

  return (
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
    </Routes>
  );
}

export default App;
