const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function generateRoadmap(prompt) {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `Por favor, crie um roadmap detalhado para: "${prompt}".
Retorne a resposta no formato JSON conforme o modelo abaixo, sem texto extra, apenas o JSON:

{
  "titulo": "string com o título do roadmap",
  "descricao": "string com uma descrição geral do roadmap",
  "passos": [
    {
      "titulo": "string com o título do passo",
      "descricao": "string com a descrição detalhada do passo",
      "concluido": false
    }
  ]
}`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://project4-2025a-pedro-breno.onrender.com"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao gerar roadmap:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = generateRoadmap;
