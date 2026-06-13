export const summarizePrompt = (originalText) => { return `You extract key points from a text for an active recall learning system.

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
${originalText}` };


export const checkPrompt = (keyPoints, recallText) => { return `You are a system that compares a source outline with a user recall.

Your task is to evaluate recall accuracy, not writing quality. Paraphrases are allowed. Do not be strict about wording.

Inputs:
1. key points from a text
2. user recalled text

Rules:
- correct: ideas supported by key points (including paraphrases or reasonable added detail)
- incorrect: claims that correspond to a key point but contain wrong information (wrong dates, names, numbers, relationships, causes, etc.)
- missing: key points not present in user text
- hallucinations: claims not supported by key points and that do not correspond to any source fact

Important:
- Do not label elaborations of valid ideas as hallucinations
- Use incorrect when the user attempts to recall a source fact but gets part of it wrong
- Use hallucinations only for entirely new unsupported claims
- If uncertain, prefer correct over incorrect, and incorrect over hallucinations
- If a key point is recalled incorrectly, place it in "incorrect" and do not also place it in "missing"
- Every item in "correct", "missing", "incorrect", and "hallucinations" must be directly traceable to either the key points or the user's text
- If there is not enough information, leave arrays empty

Output only JSON:
{"correct":[],"incorrect":[],"missing":[],"hallucinations":[]}

INPUT:

KEY POINTS:
${keyPoints}

USER TEXT:
${recallText}` };