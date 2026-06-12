import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
const token = import.meta.env.VITE_AI_API;

async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  const result = await response.json();
  return result;
}

function createQuery(prompt) {
  return query({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "meta-llama/Llama-3.1-8B-Instruct:novita",
  }).then((response) => response.choices[0].message.content);
}

function TextPage({ originalText, setKeyPoints, keyPoints }) {
  const navigate = useNavigate();
  function redirectToWriting() {
    navigate("/text/writing");
  }
  const summarizePrompt = `You extract key points from a text for an active recall learning system.

Your job is to break the text into concise, self-contained factual ideas that preserve meaning for memory testing.

Rules:
- Keep each point atomic (one idea per line)
- Remove filler, repetition, and examples unless essential
- Preserve important facts, definitions, steps, and relationships
- Do not interpret or add new information
- Keep wording short and simple but accurate
- Prefer 5–15 key points depending on text length

Output ONLY a JSON array of strings:
["point 1", "point 2", "point 3", ...]

TEXT:
${originalText}`;
  useEffect(() => {
    async function generateKeyPoints() {
      const result = await createQuery(summarizePrompt);
      setKeyPoints(result);
    }

    generateKeyPoints();
  }, [originalText]);

  return (
    <div>
      <p>{originalText}</p>
      <button onClick={redirectToWriting}>I'm ready</button>
    </div>
  );
}

export default TextPage;
