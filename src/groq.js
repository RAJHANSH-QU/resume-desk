const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const askGroq = async (prompt) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
};

export const generateSummary = async (name, jobTitle, company, skills) => {
  const prompt = `Write a short 3-sentence professional resume summary for ${name}, a ${jobTitle} at ${company} with skills in ${skills}. Make it impressive and ATS friendly. Only return the summary text, nothing else.`;
  return await askGroq(prompt);
};

export const suggestSkills = async (jobTitle) => {
  const prompt = `List 8 relevant professional skills for a ${jobTitle}. Return only the skills, one per line, no numbers or bullets, no extra text.`;
  return await askGroq(prompt);
};

export const improveDescription = async (description) => {
  const prompt = `Rewrite this job description into 3 professional resume bullet points: "${description}". Return only the bullet points starting with •, nothing else.`;
  return await askGroq(prompt);
};