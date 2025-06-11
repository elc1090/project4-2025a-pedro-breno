const express = require('express');
const router = express.Router();
const generateRoadmap = require('../generateRoadmap');

router.post('/', async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Descrição é obrigatória.' });
  }

  try {
    const roadmap = await generateRoadmap(description);
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar roadmap.' });
  }
});

module.exports = router;
