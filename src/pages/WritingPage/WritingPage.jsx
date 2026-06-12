import React from "react";
import { useState } from "react";

function WritingPage({ keyPoints }) {
  const [recallText, setRecallText] = useState("");

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
    </>
  );
}

export default WritingPage;
