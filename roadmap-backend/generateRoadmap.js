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
            content: `
Você é uma IA que retorna apenas JSON válido. Não explique, não use markdown, apenas retorne um objeto JSON.

Crie um roadmap detalhado em **português brasileiro** para o seguinte tema: "${prompt}"

Formato exato esperado:

{
  "titulo": "Título do roadmap",
  "descricao": "Descrição geral do roadmap",
  "passos": [
    {
      "titulo": "Título do passo 1",
      "descricao": "Descrição do passo 1",
      "concluido": false
    },
    {
      "titulo": "Título do passo 2",
      "descricao": "Descrição do passo 2",
      "concluido": false
    }
  ]
}

Não inclua nenhuma explicação fora desse JSON, não inclua subpassos ou níveis adicionais, não alter o formato.
`
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

    const content = response.data.choices[0].message.content;

    const parsed = JSON.parse(content);

    const roadmap = typeof parsed.roadmap === 'string'
      ? JSON.parse(parsed.roadmap)
      : parsed;

    return roadmap;

  } catch (error) {
    console.error('Erro ao gerar roadmap:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = generateRoadmap;
