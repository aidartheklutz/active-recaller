const token = import.meta.env.VITE_AI_API;
// const token = "noWaste";

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
		}
	);
	const result = await response.json();
	return result;
}



export function createQuery(prompt) {
  return query({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "Qwen/Qwen3-8B:nscale",
  }).then((response) => response.choices[0].message.content);
}